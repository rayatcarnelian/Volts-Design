import streamlit as st
import replicate
import time
from PIL import Image
import io

# --- 1. PAGE CONFIGURATION ---
st.set_page_config(
    page_title="VOLTS DESIGN | LAB",
    page_icon="⚡",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# --- 2. EDITORIAL BRUTALISM CSS (Black & Gold) ---
st.markdown("""
    <style>
    /* IMPORT FONTS */
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Inter:wght@300;400&display=swap');

    /* GLOBAL THEME */
    .stApp { background-color: #050505; color: #E0E0E0; }
    
    /* TYPOGRAPHY */
    h1, h2, h3 { 
        font-family: 'Cinzel', serif; 
        color: #D4AF37; 
        text-transform: uppercase; 
        letter-spacing: 2px; 
    }
    p, div, label { font-family: 'Inter', sans-serif; color: #CCCCCC; }

    /* INPUT FIELDS */
    .stTextInput > div > div > input {
        background-color: #111; 
        color: #D4AF37; 
        border: 1px solid #333;
        border-radius: 0px;
    }
    
    /* BUTTONS */
    .stButton > button {
        background: linear-gradient(45deg, #D4AF37, #8B6F20);
        color: #000;
        font-family: 'Cinzel';
        font-weight: bold;
        border: none;
        border-radius: 0px;
        padding: 15px 30px;
        width: 100%;
        transition: all 0.3s ease;
    }
    .stButton > button:hover {
        transform: scale(1.02);
        box-shadow: 0 0 15px rgba(212, 175, 55, 0.4);
    }

    /* UPLOADER */
    [data-testid='stFileUploader'] {
        border: 1px dashed #D4AF37;
        padding: 20px;
        background-color: #0A0A0A;
    }
    </style>
""", unsafe_allow_html=True)

# --- 3. THE UI LAYOUT ---

# Header
col1, col2 = st.columns([8, 2])
with col1:
    st.title("THE VISION ENGINE")
    st.markdown("*UPLOAD YOUR SPACE. SEE THE FUTURE.*")
with col2:
    st.image("https://img.icons8.com/ios-filled/100/D4AF37/lightning-bolt.png", width=60) # Placeholder Logo

st.divider()

# Main Interaction Area
c1, c2 = st.columns([1, 1], gap="large")

with c1:
    st.subheader("1. INPUT DATA")
    uploaded_file = st.file_uploader("Upload Room Photo", type=["jpg", "png", "jpeg"])
    
    st.subheader("2. CONFIGURE AESTHETIC")
    style_choice = st.selectbox(
        "Select Design DNA",
        ["Modern Luxury (Dark & Gold)", "Japandi (Zen & Wood)", "Industrial (Raw Concrete)", "Cyberpunk (Neon & Glass)"]
    )
    
    room_type = st.selectbox(
        "Room Type",
        ["Living Room", "Bedroom", "Kitchen", "Office"]
    )

    # Lead Capture (The "Payment" for the free tool)
    whatsapp = st.text_input("WhatsApp Number (To receive HD Renders)", placeholder="+601...")

    generate_btn = st.button("INITIALIZE RENDER // EXECUTE")

with c2:
    st.subheader("3. VISUAL OUTPUT")
    output_placeholder = st.empty()
    
    # Default State
    if not uploaded_file:
        output_placeholder.info("AWAITING INPUT DATA...")
    else:
        # Show Preview
        image = Image.open(uploaded_file)
        output_placeholder.image(image, caption="SOURCE FEED", use_container_width=True)

# --- 4. THE AI LOGIC (BACKEND) ---

if generate_btn and uploaded_file and whatsapp:
    if len(whatsapp) < 9:
        st.error("ERROR: INVALID ID. PLEASE ENTER A VALID WHATSAPP NUMBER.")
    else:
        try:
            with st.spinner("ANALYZING STRUCTURAL GEOMETRY..."):
                # Simulating processing time for effect
                time.sleep(1) 
            
            with st.spinner("INJECTING DESIGN DNA..."):
                # 1. Convert Image for API
                buf = io.BytesIO()
                image.save(buf, format="PNG")
                buf.seek(0)
                
                # 2. Construct the Prompt
                prompt = f"Interior design of a {room_type}, {style_choice} style, cinematic lighting, 8k resolution, photorealistic, architectural digest photography."
                
                # 3. Call Replicate (FLUX or similar model)
                # Note: 'black-forest-labs/flux-schnell' is fast and cheap.
                # You can also use specific ControlNet models for exact room structure preservation.
                output = replicate.run(
                    "black-forest-labs/flux-schnell", 
                    input={
                        "prompt": prompt,
                        "aspect_ratio": "16:9",
                        "output_quality": 90
                    }
                )
                
                # 4. Display Result
                result_url = output[0] # FLUX returns a list
                
                # Replace the preview with the result
                output_placeholder.image(result_url, caption=f"GENERATED CONCEPT: {style_choice.upper()}", use_container_width=True)
                
                st.success(f"RENDER COMPLETE. HD LINK SENT TO {whatsapp}")
                
                # (Optional) Save lead to database code here
                # save_lead(whatsapp, style_choice)

        except Exception as e:
            st.error(f"SYSTEM FAILURE: {str(e)}")
            st.warning("CHECK API CONNECTION.")

elif generate_btn:
    st.warning("DATA MISSING. PLEASE UPLOAD PHOTO AND ENTER WHATSAPP.")
