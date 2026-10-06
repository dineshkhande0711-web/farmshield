import sys
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

# -------------------------------------------------------------
# PRESENTATION INITIALIZATION (16:9 Widescreen)
# -------------------------------------------------------------
prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)

blank_layout = prs.slide_layouts[6]

# -------------------------------------------------------------
# DESIGN SYSTEM / COLOR PALETTE (Subtle Green + Navy + Alerts)
# -------------------------------------------------------------
BG_LIGHT       = RGBColor(248, 250, 252)  # #F8FAFC (Ultra light slate)
CARD_BG        = RGBColor(255, 255, 255)  # #FFFFFF
CARD_BG_MUTED  = RGBColor(241, 245, 249)  # #F1F5F9
CARD_BORDER    = RGBColor(226, 232, 240)  # #E2E8F0

NAVY_HERO      = RGBColor(15, 23, 42)     # #0F172A (Deep Slate Navy)
NAVY_CARD      = RGBColor(30, 41, 59)     # #1E293B
NAVY_MUTED     = RGBColor(51, 65, 85)     # #334155

GREEN_PRIMARY  = RGBColor(16, 185, 129)   # #10B981 (Emerald Green)
GREEN_DARK     = RGBColor(5, 150, 105)    # #059669
GREEN_BG       = RGBColor(236, 253, 245)   # #ECFDF5 (Light mint)
GREEN_BORDER   = RGBColor(167, 243, 208)   # #A7F3D0

SKY_BLUE       = RGBColor(14, 165, 233)   # #0EA5E9
SKY_BG         = RGBColor(240, 249, 255)   # #F0F9FF
SKY_BORDER     = RGBColor(186, 230, 253)

AMBER_ALERT    = RGBColor(245, 158, 11)   # #F59E0B
AMBER_BG       = RGBColor(254, 243, 199)   # #FEF3C7
AMBER_BORDER   = RGBColor(253, 230, 138)

RED_ALERT      = RGBColor(239, 68, 68)    # #EF4444
RED_BG         = RGBColor(254, 242, 242)    # #FEF2F2
RED_BORDER     = RGBColor(254, 202, 202)

TEXT_DARK      = RGBColor(15, 23, 42)     # #0F172A
TEXT_MUTED     = RGBColor(100, 116, 139)  # #64748B
TEXT_WHITE     = RGBColor(255, 255, 255)

FONT_HEADING   = "Segoe UI"
FONT_BODY      = "Segoe UI"

# -------------------------------------------------------------
# HELPER FUNCTIONS
# -------------------------------------------------------------
def set_slide_background(slide, color=BG_LIGHT):
    bg = slide.background
    fill = bg.fill
    fill.solid()
    fill.fore_color.rgb = color

def add_header(slide, tracker_tag, title_text, subtitle_text=None):
    """Clean, competition-standard header with category tag and subtitle."""
    # Top Tag
    tag_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.733), Inches(0.32))
    tf_tag = tag_box.text_frame
    tf_tag.word_wrap = True
    tf_tag.margin_left = tf_tag.margin_right = tf_tag.margin_top = tf_tag.margin_bottom = 0
    p_tag = tf_tag.paragraphs[0]
    p_tag.text = tracker_tag.upper()
    p_tag.font.name = FONT_HEADING
    p_tag.font.size = Pt(10)
    p_tag.font.bold = True
    p_tag.font.color.rgb = GREEN_DARK

    # Title Box
    title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.72), Inches(11.733), Inches(0.55))
    tf_title = title_box.text_frame
    tf_title.word_wrap = True
    tf_title.margin_left = tf_title.margin_right = tf_title.margin_top = tf_title.margin_bottom = 0
    p_title = tf_title.paragraphs[0]
    p_title.text = title_text
    p_title.font.name = FONT_HEADING
    p_title.font.size = Pt(25)
    p_title.font.bold = True
    p_title.font.color.rgb = NAVY_HERO

    if subtitle_text:
        sub_box = slide.shapes.add_textbox(Inches(0.8), Inches(1.3), Inches(11.733), Inches(0.35))
        tf_sub = sub_box.text_frame
        tf_sub.word_wrap = True
        tf_sub.margin_left = tf_sub.margin_right = tf_sub.margin_top = tf_sub.margin_bottom = 0
        p_sub = tf_sub.paragraphs[0]
        p_sub.text = subtitle_text
        p_sub.font.name = FONT_BODY
        p_sub.font.size = Pt(12.5)
        p_sub.font.color.rgb = TEXT_MUTED

def add_card(slide, left, top, width, height, bg_color=CARD_BG, border_color=CARD_BORDER, border_width=1.0):
    """Creates a sleek rounded rectangle card container."""
    shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
    shape.fill.solid()
    shape.fill.fore_color.rgb = bg_color
    if border_color:
        shape.line.color.rgb = border_color
        shape.line.width = Pt(border_width)
    else:
        shape.line.fill.background()
    return shape

def add_pill(slide, left, top, width, height, text, bg_color, text_color, font_size=9.5, bold=True):
    """Creates a status pill badge."""
    pill = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
    pill.fill.solid()
    pill.fill.fore_color.rgb = bg_color
    pill.line.fill.background()
    tf = pill.text_frame
    tf.word_wrap = False
    tf.vertical_anchor = MSO_ANCHOR.MIDDLE
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    p = tf.paragraphs[0]
    p.text = text
    p.font.name = FONT_HEADING
    p.font.size = Pt(font_size)
    p.font.bold = bold
    p.font.color.rgb = text_color
    p.alignment = PP_ALIGN.CENTER
    return pill


# =============================================================
# SLIDE 1: TITLE / HERO
# =============================================================
slide1 = prs.slides.add_slide(blank_layout)
set_slide_background(slide1, BG_LIGHT)

# Left Side: Hero Information Card
hero_card = add_card(slide1, Inches(0.8), Inches(0.8), Inches(6.8), Inches(5.9), CARD_BG, CARD_BORDER, 1.2)

# Badges
add_pill(slide1, Inches(1.2), Inches(1.05), Inches(5.8), Inches(0.28),
         "PCCOE INTERNATIONAL GRAND CHALLENGE: 2026 | PUNE, INDIA",
         NAVY_CARD, RGBColor(226, 232, 240), font_size=8.5, bold=True)

add_pill(slide1, Inches(1.2), Inches(1.4), Inches(3.2), Inches(0.28),
         "THEME: AI FOR CLIMATE CHANGE",
         GREEN_BG, GREEN_DARK, font_size=9, bold=True)

# Main Title & Subtitle in Left Card
title_box = slide1.shapes.add_textbox(Inches(1.2), Inches(1.75), Inches(6.0), Inches(2.2))
tf = title_box.text_frame
tf.word_wrap = True
tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0

p1 = tf.paragraphs[0]
p1.text = "FARMSHIELD AI"
p1.font.name = FONT_HEADING
p1.font.size = Pt(46)
p1.font.bold = True
p1.font.color.rgb = NAVY_HERO

p2 = tf.add_paragraph()
p2.text = "AI-Powered Multi-Hazard Climate Impact & Early Intervention System for Agriculture"
p2.font.name = FONT_BODY
p2.font.size = Pt(15)
p2.font.bold = True
p2.font.color.rgb = GREEN_DARK
p2.space_before = Pt(6)

# Core Thesis Box (The 1 thing to prove clearly)
thesis_box = add_card(slide1, Inches(1.2), Inches(3.55), Inches(6.0), Inches(1.05), GREEN_BG, GREEN_BORDER)
tf_th = thesis_box.text_frame
tf_th.word_wrap = True
tf_th.vertical_anchor = MSO_ANCHOR.MIDDLE
tf_th.margin_left = tf_th.margin_right = Inches(0.2)
p_th = tf_th.paragraphs[0]
p_th.text = "“FarmShield converts a weather warning into a crop-specific intervention, then uses field evidence to update the risk.”"
p_th.font.name = FONT_HEADING
p_th.font.size = Pt(11.5)
p_th.font.bold = True
p_th.font.color.rgb = GREEN_DARK

# Tagline Badge
tagline_box = add_card(slide1, Inches(1.2), Inches(4.75), Inches(6.0), Inches(0.75), NAVY_HERO, None)
tf_tag = tagline_box.text_frame
tf_tag.vertical_anchor = MSO_ANCHOR.MIDDLE
p_tag = tf_tag.paragraphs[0]
p_tag.text = "“From Climate Prediction to Crop Protection”"
p_tag.font.name = FONT_HEADING
p_tag.font.size = Pt(13.5)
p_tag.font.bold = True
p_tag.font.color.rgb = GREEN_PRIMARY
p_tag.alignment = PP_ALIGN.CENTER

# Right Side: Visual Closed Loop Snapshot
right_card = add_card(slide1, Inches(7.8), Inches(0.8), Inches(4.733), Inches(5.9), NAVY_HERO, None)

right_box = slide1.shapes.add_textbox(Inches(8.1), Inches(1.15), Inches(4.133), Inches(5.2))
tf_r = right_box.text_frame
tf_r.word_wrap = True
tf_r.margin_left = tf_r.margin_right = tf_r.margin_top = tf_r.margin_bottom = 0

pr_head = tf_r.paragraphs[0]
pr_head.text = "THE CLOSED-LOOP DIFFERENCE"
pr_head.font.name = FONT_HEADING
pr_head.font.size = Pt(11)
pr_head.font.bold = True
pr_head.font.color.rgb = GREEN_PRIMARY

loop_preview = [
    ("🌦️ PREDICT", "Weather APIs & multi-hazard risk engine"),
    ("🛡️ PROTECT", "Crop & growth-stage specific intervention"),
    ("📸 OBSERVE", "Farmer uploads crop field photo / video"),
    ("🤖 VERIFY", "CV checks: Improving | Persisting | Increasing"),
    ("🔄 ADAPT", "Risk updated; adaptive action triggered")
]

for idx, (head, desc) in enumerate(loop_preview):
    p_step = tf_r.add_paragraph()
    p_step.text = head
    p_step.font.name = FONT_HEADING
    p_step.font.size = Pt(12)
    p_step.font.bold = True
    p_step.font.color.rgb = TEXT_WHITE
    p_step.space_before = Pt(10)

    p_d = tf_r.add_paragraph()
    p_d.text = desc
    p_d.font.name = FONT_BODY
    p_d.font.size = Pt(10.5)
    p_d.font.color.rgb = RGBColor(148, 163, 184)

# Footer credits
foot_box = slide1.shapes.add_textbox(Inches(0.8), Inches(6.85), Inches(11.733), Inches(0.4))
tf_foot = foot_box.text_frame
tf_foot.margin_left = tf_foot.margin_right = tf_foot.margin_top = tf_foot.margin_bottom = 0
p_f = tf_foot.paragraphs[0]
p_f.text = "Team Members Details:  Dinesh Khande • UG • JSPM COE • SPPU  |  Akshay Ryakawar • UG • JSPM COE • SPPU  |  Sanskar Penshanwar • UG • JSPM COE • SPPU"
p_f.font.size = Pt(10)
p_f.font.color.rgb = TEXT_MUTED


# =============================================================
# SLIDE 2: PROBLEM STATEMENT/IDEA (Radically Simplified)
# =============================================================
slide2 = prs.slides.add_slide(blank_layout)
set_slide_background(slide2, BG_LIGHT)

add_header(slide2, "PROBLEM STATEMENT/IDEA",
           "Problem Statement/Idea",
           "Climate risk is no longer a single isolated forecast — compounding shocks disrupt specific crop cycles.")

# Central Flow: WEATHER EVENT -> CROP STRESS -> CROP LOSS
chain_card = add_card(slide2, Inches(0.8), Inches(1.75), Inches(11.733), Inches(0.65), CARD_BG, CARD_BORDER)
tf_ch = chain_card.text_frame
tf_ch.vertical_anchor = MSO_ANCHOR.MIDDLE
p_ch = tf_ch.paragraphs[0]
p_ch.text = "⚡ THE VULNERABILITY CHAIN:   Weather Event   ➔   Unnoticed Crop Stress   ➔   Preventable Crop Loss"
p_ch.font.name = FONT_HEADING
p_ch.font.size = Pt(12.5)
p_ch.font.bold = True
p_ch.font.color.rgb = RED_ALERT
p_ch.alignment = PP_ALIGN.CENTER

# 4 Simplified Visual Hazard Cards (As requested by user!)
hazards = [
    ("🌧️", "Excess Rainfall", "Waterlogging", RED_BG, RED_BORDER, RED_ALERT),
    ("☀️", "Heat Stress", "Flower / Fruit Stress", AMBER_BG, AMBER_BORDER, AMBER_ALERT),
    ("💧", "Low Rainfall", "Water Stress", SKY_BG, SKY_BORDER, SKY_BLUE),
    ("🌡️", "Temperature Shock", "Growth Disruption", AMBER_BG, AMBER_BORDER, AMBER_ALERT),
]

card_w = Inches(2.78)
card_gap = Inches(0.2)
left_start = Inches(0.8)

for i, (icon, title, impact, bg, border, accent) in enumerate(hazards):
    c_left = left_start + i * (card_w + card_gap)
    h_card = add_card(slide2, c_left, Inches(2.6), card_w, Inches(2.3), bg, border)
    
    tb = slide2.shapes.add_textbox(c_left + Inches(0.2), Inches(2.75), card_w - Inches(0.4), Inches(2.0))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    
    p_ico = tf.paragraphs[0]
    p_ico.text = icon
    p_ico.font.size = Pt(32)
    
    p_t = tf.add_paragraph()
    p_t.text = title
    p_t.font.name = FONT_HEADING
    p_t.font.size = Pt(13.5)
    p_t.font.bold = True
    p_t.font.color.rgb = NAVY_HERO
    p_t.space_before = Pt(6)
    
    p_d = tf.add_paragraph()
    p_d.text = impact
    p_d.font.name = FONT_HEADING
    p_d.font.size = Pt(12)
    p_d.font.bold = True
    p_d.font.color.rgb = accent
    p_d.space_before = Pt(6)

# Large Memorable Statement (Requested by user!)
hero_stmt = add_card(slide2, Inches(0.8), Inches(5.15), Inches(11.733), Inches(1.6), NAVY_HERO, None)
tf_hs = hero_stmt.text_frame
tf_hs.vertical_anchor = MSO_ANCHOR.MIDDLE
p_h1 = tf_hs.paragraphs[0]
p_h1.text = "“Farmers get weather forecasts."
p_h1.font.name = FONT_HEADING
p_h1.font.size = Pt(22)
p_h1.font.bold = True
p_h1.font.color.rgb = RGBColor(226, 232, 240)
p_h1.alignment = PP_ALIGN.CENTER

p_h2 = tf_hs.add_paragraph()
p_h2.text = "They need crop-specific actions.”"
p_h2.font.name = FONT_HEADING
p_h2.font.size = Pt(24)
p_h2.font.bold = True
p_h2.font.color.rgb = GREEN_PRIMARY
p_h2.alignment = PP_ALIGN.CENTER


# =============================================================
# SLIDE 3: PROBLEM STATEMENT/IDEA: THE GAP
# =============================================================
slide3 = prs.slides.add_slide(blank_layout)
set_slide_background(slide3, BG_LIGHT)

add_header(slide3, "PROBLEM STATEMENT/IDEA",
           "Problem Statement/Idea: The Core Gap",
           "Weather Forecast ≠ Crop Protection — Why general meteorological forecasts fail to stop crop loss.")

col_w = Inches(5.7)

# Left Column: Standard Weather App
c_left = add_card(slide3, Inches(0.8), Inches(1.8), col_w, Inches(4.3), CARD_BG, CARD_BORDER)
tb_l = slide3.shapes.add_textbox(Inches(1.1), Inches(2.0), Inches(5.1), Inches(3.9))
tf_l = tb_l.text_frame
tf_l.word_wrap = True
tf_l.margin_left = tf_l.margin_right = tf_l.margin_top = tf_l.margin_bottom = 0

add_pill(slide3, Inches(1.1), Inches(2.0), Inches(2.6), Inches(0.32),
         "STATUS QUO: WEATHER APPS", RED_BG, RED_ALERT, font_size=9, bold=True)

pl_flow = tf_l.paragraphs[0]
pl_flow.text = "\n\nTypical Flow:"
pl_flow.font.size = Pt(11)
pl_flow.font.bold = True
pl_flow.font.color.rgb = TEXT_MUTED

pl_pipe = tf_l.add_paragraph()
pl_pipe.text = "Weather Satellite  ➔  'Rain Expected: 70%'  ➔  Confused Farmer"
pl_pipe.font.name = FONT_HEADING
pl_pipe.font.size = Pt(11.5)
pl_pipe.font.bold = True
pl_pipe.font.color.rgb = RED_ALERT
pl_pipe.space_before = Pt(4)

gaps = [
    ("❌ Tells what the sky does, not what the crop needs", "A rain forecast does not explain field risk."),
    ("❌ Blind to growth stages", "30mm rain is good for sugarcane, but fatal for flowering peas."),
    ("❌ Zero field verification", "One-way broadcast with no check on whether crops survived.")
]

for title, desc in gaps:
    p_t = tf_l.add_paragraph()
    p_t.text = title
    p_t.font.name = FONT_HEADING
    p_t.font.size = Pt(11.5)
    p_t.font.bold = True
    p_t.font.color.rgb = NAVY_HERO
    p_t.space_before = Pt(10)

    p_d = tf_l.add_paragraph()
    p_d.text = desc
    p_d.font.name = FONT_BODY
    p_d.font.size = Pt(10.5)
    p_d.font.color.rgb = TEXT_MUTED

# Right Column: FarmShield AI
c_right = add_card(slide3, Inches(6.833), Inches(1.8), col_w, Inches(4.3), GREEN_BG, GREEN_BORDER, 1.5)
tb_r = slide3.shapes.add_textbox(Inches(7.133), Inches(2.0), Inches(5.1), Inches(3.9))
tf_r = tb_r.text_frame
tf_r.word_wrap = True
tf_r.margin_left = tf_r.margin_right = tf_r.margin_top = tf_r.margin_bottom = 0

add_pill(slide3, Inches(7.133), Inches(2.0), Inches(2.6), Inches(0.32),
         "FARMSHIELD AI: CLOSED LOOP", GREEN_PRIMARY, TEXT_WHITE, font_size=9, bold=True)

pr_flow = tf_r.paragraphs[0]
pr_flow.text = "\n\nFarmShield Flow:"
pr_flow.font.size = Pt(11)
pr_flow.font.bold = True
pr_flow.font.color.rgb = GREEN_DARK

pr_pipe = tf_r.add_paragraph()
pr_pipe.text = "Weather ➔ Hazard ➔ Crop Stage ➔ Action ➔ Photo ➔ Verify"
pr_pipe.font.name = FONT_HEADING
pr_pipe.font.size = Pt(11.5)
pr_pipe.font.bold = True
pr_pipe.font.color.rgb = GREEN_DARK
pr_pipe.space_before = Pt(4)

advantages = [
    ("✔ Answers: 'What does this weather mean for THIS crop?'", "Converts climate volatility into localized crop vulnerability."),
    ("✔ Growth-stage specific rules", "Dynamic thresholds for germination, flowering, podding, and harvest."),
    ("✔ Field verification loop", "Farmer photo upload allows AI to verify crop stress trend over time.")
]

for title, desc in advantages:
    p_t = tf_r.add_paragraph()
    p_t.text = title
    p_t.font.name = FONT_HEADING
    p_t.font.size = Pt(11.5)
    p_t.font.bold = True
    p_t.font.color.rgb = NAVY_HERO
    p_t.space_before = Pt(10)

    p_d = tf_r.add_paragraph()
    p_d.text = desc
    p_d.font.name = FONT_BODY
    p_d.font.size = Pt(10.5)
    p_d.font.color.rgb = NAVY_MUTED

# Bottom Banner
high_card = add_card(slide3, Inches(0.8), Inches(6.25), Inches(11.733), Inches(0.6), NAVY_HERO, None)
tf_h = high_card.text_frame
tf_h.vertical_anchor = MSO_ANCHOR.MIDDLE
p_h = tf_h.paragraphs[0]
p_h.text = "THE DIFFERENCE: Normal weather apps predict weather. FarmShield predicts CROP RISK and verifies FIELD OUTCOMES."
p_h.font.name = FONT_HEADING
p_h.font.size = Pt(11.5)
p_h.font.bold = True
p_h.font.color.rgb = GREEN_PRIMARY
p_h.alignment = PP_ALIGN.CENTER


# =============================================================
# SLIDE 4: PROPOSED SOLUTION/ARCHITECTURE (Workflow)
# =============================================================
slide4 = prs.slides.add_slide(blank_layout)
set_slide_background(slide4, BG_LIGHT)

add_header(slide4, "PROPOSED SOLUTION/ARCHITECTURE",
           "Proposed Solution/Architecture",
           "From Forecast to Field-Level Action — The 5-stage closed-loop pipeline.")

# 5 Horizontal Pipeline Cards
pipeline_5 = [
    ("1. PREDICT", "🌦️ Weather Telemetry", "Ingest IMD/weather data to detect rainfall, heat, or moisture hazards.", SKY_BG, SKY_BORDER),
    ("2. ASSESS", "🌱 Crop Phenology", "Map hazard against specific crop variety and vulnerable growth stage.", AMBER_BG, AMBER_BORDER),
    ("3. PROTECT", "🛡️ Field Advisory", "Send prescriptive action (e.g. drainage, mulch) in regional language.", GREEN_BG, GREEN_BORDER),
    ("4. OBSERVE", "📸 Field Photo", "Farmer performs advisory and uploads a smartphone crop snapshot.", CARD_BG, CARD_BORDER),
    ("5. ADAPT", "🔄 Stress Check", "Compare before/after crop condition; update risk & next step.", NAVY_HERO, None)
]

c_w5 = Inches(2.21)
gap5 = Inches(0.17)

for i, (step_num, title, desc, bg, border) in enumerate(pipeline_5):
    cx = Inches(0.8) + i * (c_w5 + gap5)
    sc = add_card(slide4, cx, Inches(2.0), c_w5, Inches(3.9), bg, border)
    
    tb = slide4.shapes.add_textbox(cx + Inches(0.15), Inches(2.15), c_w5 - Inches(0.3), Inches(3.6))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    
    p_num = tf.paragraphs[0]
    p_num.text = step_num
    p_num.font.name = FONT_HEADING
    p_num.font.size = Pt(11)
    p_num.font.bold = True
    p_num.font.color.rgb = GREEN_PRIMARY if bg == NAVY_HERO else GREEN_DARK
    
    p_t = tf.add_paragraph()
    p_t.text = title
    p_t.font.name = FONT_HEADING
    p_t.font.size = Pt(13)
    p_t.font.bold = True
    p_t.font.color.rgb = TEXT_WHITE if bg == NAVY_HERO else NAVY_HERO
    p_t.space_before = Pt(8)
    
    p_d = tf.add_paragraph()
    p_d.text = desc
    p_d.font.name = FONT_BODY
    p_d.font.size = Pt(11)
    p_d.font.color.rgb = RGBColor(203, 213, 225) if bg == NAVY_HERO else NAVY_MUTED
    p_d.space_before = Pt(10)

# Closed-loop return banner
loop_card = add_card(slide4, Inches(0.8), Inches(6.15), Inches(11.733), Inches(0.65), GREEN_BG, GREEN_BORDER)
tf_l = loop_card.text_frame
tf_l.vertical_anchor = MSO_ANCHOR.MIDDLE
p_l = tf_l.paragraphs[0]
p_l.text = "🔄 THE CLOSED LOOP: Stage 5 field observations automatically feed back into Stage 1 continuous risk monitoring."
p_l.font.name = FONT_HEADING
p_l.font.size = Pt(12)
p_l.font.bold = True
p_l.font.color.rgb = GREEN_DARK
p_l.alignment = PP_ALIGN.CENTER


# =============================================================
# SLIDE 5: UNIQUE FEATURES/INNOVATION (THE HERO SLIDE!)
# =============================================================
slide5 = prs.slides.add_slide(blank_layout)
set_slide_background(slide5, BG_LIGHT)

add_header(slide5, "UNIQUE FEATURES/INNOVATION",
           "Unique features/Innovation",
           "The Continuous Feedback Loop — Why FarmShield is fundamentally different from a chatbot or weather app.")

# Left Container: The Hero Loop Diagram
left_c = add_card(slide5, Inches(0.8), Inches(1.8), Inches(6.0), Inches(4.3), NAVY_HERO, None)

tb_lp = slide5.shapes.add_textbox(Inches(1.1), Inches(2.0), Inches(5.4), Inches(3.9))
tf_lp = tb_lp.text_frame
tf_lp.word_wrap = True
tf_lp.margin_left = tf_lp.margin_right = tf_lp.margin_top = tf_lp.margin_bottom = 0

add_pill(slide5, Inches(1.1), Inches(2.0), Inches(3.2), Inches(0.3),
         "THE HERO INNOVATION", NAVY_CARD, GREEN_PRIMARY, font_size=9.5, bold=True)

p_lh = tf_lp.paragraphs[0]
p_lh.text = "\n\nTHE 5-STEP FEEDBACK LOOP"
p_lh.font.name = FONT_HEADING
p_lh.font.size = Pt(16)
p_lh.font.bold = True
p_lh.font.color.rgb = TEXT_WHITE

loop_flow_steps = [
    "1. PREDICT  ➔  Micro-hazard risk identified 48h early",
    "2. PROTECT  ➔  Stage-specific intervention dispatched",
    "3. OBSERVE  ➔  Farmer uploads treated field photo",
    "4. VERIFY   ➔  AI checks if crop stress is recovering",
    "5. ADAPT    ➔  Recalibrate risk & trigger next action"
]

for st in loop_flow_steps:
    p_s = tf_lp.add_paragraph()
    p_s.text = st
    p_s.font.name = FONT_HEADING
    p_s.font.size = Pt(11.5)
    p_s.font.bold = True
    p_s.font.color.rgb = RGBColor(226, 232, 240)
    p_s.space_before = Pt(6)

p_loop_back = tf_lp.add_paragraph()
p_loop_back.text = "↺ ADAPT loops back to PREDICT for continuous protection"
p_loop_back.font.name = FONT_HEADING
p_loop_back.font.size = Pt(11)
p_loop_back.font.bold = True
p_loop_back.font.color.rgb = GREEN_PRIMARY
p_loop_back.space_before = Pt(10)

# Right Container: AI Crop Stress Verification Outputs
right_c = add_card(slide5, Inches(7.1), Inches(1.8), Inches(5.433), Inches(4.3), CARD_BG, CARD_BORDER)

tb_r = slide5.shapes.add_textbox(Inches(7.35), Inches(2.0), Inches(4.933), Inches(3.9))
tf_r = tb_r.text_frame
tf_r.word_wrap = True
tf_r.margin_left = tf_r.margin_right = tf_r.margin_top = tf_r.margin_bottom = 0

add_pill(slide5, Inches(7.35), Inches(2.0), Inches(3.2), Inches(0.3),
         "AI CROP STRESS VERIFICATION", GREEN_BG, GREEN_DARK, font_size=9, bold=True)

p_out_h = tf_r.paragraphs[0]
p_out_h.text = "\n\nTemporal Observation: BEFORE  ➔  AFTER"
p_out_h.font.name = FONT_HEADING
p_out_h.font.size = Pt(12)
p_out_h.font.bold = True
p_out_h.font.color.rgb = TEXT_MUTED

outcomes = [
    ("🟢 STRESS IMPROVING", "Leaf turgor recovering, water receded. Logs successful intervention protocol."),
    ("🟡 STRESS PERSISTING", "Foliar stress stable; soil remains saturated. Dispatches secondary drainage advice."),
    ("🔴 STRESS INCREASING", "Early root rot or pathogen emergence. Escalates to KVK Extension Officer.")
]

for status, desc in outcomes:
    p_st = tf_r.add_paragraph()
    p_st.text = status
    p_st.font.name = FONT_HEADING
    p_st.font.size = Pt(12)
    p_st.font.bold = True
    p_st.font.color.rgb = GREEN_DARK if "IMPROVING" in status else (AMBER_ALERT if "PERSISTING" in status else RED_ALERT)
    p_st.space_before = Pt(8)

    p_std = tf_r.add_paragraph()
    p_std.text = desc
    p_std.font.name = FONT_BODY
    p_std.font.size = Pt(10.5)
    p_std.font.color.rgb = NAVY_MUTED

# The Memorable One-Sentence Takeaway (Requested by user!)
hero_bar = add_card(slide5, Inches(0.8), Inches(6.25), Inches(11.733), Inches(0.65), GREEN_BG, GREEN_BORDER)
tf_hb = hero_bar.text_frame
tf_hb.vertical_anchor = MSO_ANCHOR.MIDDLE
p_hb = tf_hb.paragraphs[0]
p_hb.text = "⭐ “FarmShield doesn't stop at an alert — it checks what happened in the field.”"
p_hb.font.name = FONT_HEADING
p_hb.font.size = Pt(13)
p_hb.font.bold = True
p_hb.font.color.rgb = GREEN_DARK
p_hb.alignment = PP_ALIGN.CENTER


# =============================================================
# SLIDE 6: PROPOSED SOLUTION: FIELD WALKTHROUGH (10-Second Visual Story)
# =============================================================
slide6 = prs.slides.add_slide(blank_layout)
set_slide_background(slide6, BG_LIGHT)

add_header(slide6, "PROPOSED SOLUTION / FIELD WALKTHROUGH",
           "Proposed Solution: Field Walkthrough",
           "One Farmer. One Risk. One Intervention. — Real-world Maharashtra scenario.")

# Context Banner
ctx_bar = add_card(slide6, Inches(0.8), Inches(1.75), Inches(11.733), Inches(0.5), NAVY_HERO, None)
tf_ctx = ctx_bar.text_frame
tf_ctx.vertical_anchor = MSO_ANCHOR.MIDDLE
p_ctx = tf_ctx.paragraphs[0]
p_ctx.text = "📍 LOCATION: Satara, Maharashtra   |   🌱 CROP: Green Pea   |   STAGE: Flowering (Sensitive to waterlogging)"
p_ctx.font.name = FONT_HEADING
p_ctx.font.size = Pt(11.5)
p_ctx.font.bold = True
p_ctx.font.color.rgb = GREEN_PRIMARY
p_ctx.alignment = PP_ALIGN.CENTER

# 7-Step Visual Timeline (Understandable in 10 seconds as requested!)
story_steps = [
    ("🌧️ 70 mm Rain", "Forecast Spike", RED_BG, RED_BORDER, RED_ALERT),
    ("🌱 Pea + Flowering", "Vulnerable Stage", AMBER_BG, AMBER_BORDER, AMBER_ALERT),
    ("🔴 HIGH RISK", "Hypoxia Warning", RED_BG, RED_BORDER, RED_ALERT),
    ("🛡️ Drainage Advisory", "Dig Lateral Furrows", GREEN_BG, GREEN_BORDER, GREEN_DARK),
    ("📸 Farmer Upload", "Photo of Treated Field", CARD_BG, CARD_BORDER, SKY_BLUE),
    ("🤖 AI Condition Check", "Planned/Prototype CV", AMBER_BG, AMBER_BORDER, AMBER_ALERT),
    ("🟢 STRESS IMPROVING", "Flower Retention OK", GREEN_BG, GREEN_BORDER, GREEN_DARK),
]

card_w7 = Inches(1.52)
gap7 = Inches(0.18)

for i, (top_txt, bot_txt, bg, border, accent) in enumerate(story_steps):
    cx = Inches(0.8) + i * (card_w7 + gap7)
    card = add_card(slide6, cx, Inches(2.45), card_w7, Inches(3.0), bg, border)
    
    tb = slide6.shapes.add_textbox(cx + Inches(0.08), Inches(2.6), card_w7 - Inches(0.16), Inches(2.7))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    
    p_step_num = tf.paragraphs[0]
    p_step_num.text = f"STEP 0{i+1}"
    p_step_num.font.name = FONT_HEADING
    p_step_num.font.size = Pt(9)
    p_step_num.font.bold = True
    p_step_num.font.color.rgb = TEXT_MUTED
    p_step_num.alignment = PP_ALIGN.CENTER
    
    p_t = tf.add_paragraph()
    p_t.text = top_txt
    p_t.font.name = FONT_HEADING
    p_t.font.size = Pt(11.5)
    p_t.font.bold = True
    p_t.font.color.rgb = accent
    p_t.space_before = Pt(14)
    p_t.alignment = PP_ALIGN.CENTER
    
    p_d = tf.add_paragraph()
    p_d.text = bot_txt
    p_d.font.name = FONT_BODY
    p_d.font.size = Pt(10)
    p_d.font.color.rgb = NAVY_MUTED
    p_d.space_before = Pt(8)
    p_d.alignment = PP_ALIGN.CENTER

# Bottom Credibility Card (Fixed unverified claims as requested!)
impact_box = add_card(slide6, Inches(0.8), Inches(5.7), Inches(11.733), Inches(1.05), CARD_BG, CARD_BORDER)
tf_imp = impact_box.text_frame
tf_imp.word_wrap = True
tf_imp.vertical_anchor = MSO_ANCHOR.MIDDLE
tf_imp.margin_left = tf_imp.margin_right = Inches(0.2)

p_im1 = tf_imp.paragraphs[0]
p_im1.text = "🎯 Projected Impact: Root stress + flower drop + potential yield loss."
p_im1.font.name = FONT_HEADING
p_im1.font.size = Pt(12)
p_im1.font.bold = True
p_im1.font.color.rgb = NAVY_HERO
p_im1.alignment = PP_ALIGN.CENTER

p_im2 = tf_imp.add_paragraph()
p_im2.text = "Timely drainage furrows prevented prolonged waterlogging, safeguarding flower retention during the critical node phase."
p_im2.font.name = FONT_BODY
p_im2.font.size = Pt(10.5)
p_im2.font.color.rgb = TEXT_MUTED
p_im2.alignment = PP_ALIGN.CENTER


# =============================================================
# SLIDE 7: PROPOSED SOLUTION/ARCHITECTURE: SYSTEM FLOW
# =============================================================
slide7 = prs.slides.add_slide(blank_layout)
set_slide_background(slide7, BG_LIGHT)

add_header(slide7, "PROPOSED SOLUTION/ARCHITECTURE",
           "Proposed Solution/Architecture: System Flow",
           "Concept first, technology second — built for Indian rural connectivity realities.")

# Honest Implementation Status Legend (Requested by user!)
add_pill(slide7, Inches(7.5), Inches(0.72), Inches(5.033), Inches(0.35),
         "Implemented ✅  |  Prototype / Demo 🟡  |  Future Integration 🔵",
         NAVY_HERO, GREEN_PRIMARY, font_size=8.5, bold=True)

# 5 Simplified Conceptual Layers (Concept First, Technology Second)
arch_layers = [
    ("1. DATA LAYER",
     "Weather Telemetry • Satellite Data • Farmer Location",
     "Tech: IMD & OpenWeather API ✅  •  Soil Grids 🟡  •  Sentinel-2 NDVI 🔵",
     SKY_BG, SKY_BORDER),
    ("2. AI RISK ENGINE",
     "Hazard Classification + Crop Stage Vulnerability Mapping",
     "Tech: Crop-Stage Vulnerability Rules Matrix ✅  •  Extreme Weather Thresholds ✅",
     AMBER_BG, AMBER_BORDER),
    ("3. ACTION ENGINE",
     "Crop-Specific Prescriptive Intervention Advisory",
     "Tech: ICAR / KVK Agronomic Protocols ✅  •  Marathi / Hindi PWA ✅  •  SMS/IVR Fallback 🔵",
     GREEN_BG, GREEN_BORDER),
    ("4. FIELD VERIFICATION",
     "Farmer Photo Upload + Crop Condition Analysis",
     "Tech: Mobile In-App Camera Upload ✅  •  Planned / Prototype CV Model 🟡",
     NAVY_HERO, None),
    ("5. ADAPTATION LAYER",
     "Temporal Delta Evaluation & Continuous Monitoring Loop",
     "Tech: Temporal Trend Engine 🟡  •  Closed-Loop Feedback System ✅",
     CARD_BG, CARD_BORDER)
]

layer_h = Inches(0.85)
gap_ly = Inches(0.12)

for i, (title, concept, tech, bg, border) in enumerate(arch_layers):
    ly = Inches(1.75) + i * (layer_h + gap_ly)
    l_card = add_card(slide7, Inches(0.8), ly, Inches(11.733), layer_h, bg, border)
    
    tb = slide7.shapes.add_textbox(Inches(1.0), ly + Inches(0.08), Inches(11.333), layer_h - Inches(0.16))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    
    p_t = tf.paragraphs[0]
    p_t.text = f"{title}:  {concept}"
    p_t.font.name = FONT_HEADING
    p_t.font.size = Pt(11.5)
    p_t.font.bold = True
    p_t.font.color.rgb = GREEN_PRIMARY if bg == NAVY_HERO else NAVY_HERO
    
    p_d = tf.add_paragraph()
    p_d.text = tech
    p_d.font.name = FONT_BODY
    p_d.font.size = Pt(10)
    p_d.font.color.rgb = RGBColor(203, 213, 225) if bg == NAVY_HERO else TEXT_MUTED
    p_d.space_before = Pt(2)

# Bottom note on feasibility
arch_note = add_card(slide7, Inches(0.8), Inches(6.5), Inches(11.733), Inches(0.45), CARD_BG, CARD_BORDER)
tf_an = arch_note.text_frame
tf_an.vertical_anchor = MSO_ANCHOR.MIDDLE
p_an = tf_an.paragraphs[0]
p_an.text = "💡 Architectural Principle: Core advisory functions offline; image analysis runs when connectivity is available."
p_an.font.name = FONT_HEADING
p_an.font.size = Pt(10.5)
p_an.font.bold = True
p_an.font.color.rgb = GREEN_DARK
p_an.alignment = PP_ALIGN.CENTER


# =============================================================
# SLIDE 8: EXPECTED OUTCOME
# =============================================================
slide8 = prs.slides.add_slide(blank_layout)
set_slide_background(slide8, BG_LIGHT)

add_header(slide8, "EXPECTED OUTCOME",
           "Expected Outcome",
           "From Reactive Farming to Early Intervention — Impact on Indian smallholders.")

# Shift Banner
shift_card = add_card(slide8, Inches(0.8), Inches(1.75), Inches(11.733), Inches(0.6), NAVY_HERO, None)
tf_sh = shift_card.text_frame
tf_sh.vertical_anchor = MSO_ANCHOR.MIDDLE
p_sh = tf_sh.paragraphs[0]
p_sh.text = "SYSTEMIC SHIFT:   REACT AFTER DAMAGE   ➔ ➔ ➔   PREDICT  +  ACT  +  VERIFY"
p_sh.font.name = FONT_HEADING
p_sh.font.size = Pt(13)
p_sh.font.bold = True
p_sh.font.color.rgb = GREEN_PRIMARY
p_sh.alignment = PP_ALIGN.CENTER

# 4 Impact Cards
impacts = [
    ("⏱️ EARLIER WARNING",
     "Detect multi-hazard climate risk 48–72h prior to severe damage, providing smallholders with a vital intervention window."),
    ("💧 SMARTER WATER RESPONSE",
     "Actionable drainage and moisture protocols mitigate both flood hypoxia and dry-spell stress."),
    ("🌱 CROP-SPECIFIC GUIDANCE",
     "Tailored advice based on crop variety and growth stage prevents wasted inputs and ineffective chemical spraying."),
    ("📸 CONTINUOUS GROUND EVIDENCE",
     "Farmer-uploaded image tracking gives smallholders confidence and extension workers (KVK) verifiable field proof.")
]

card_w2 = Inches(5.7)
card_h2 = Inches(1.8)
start_x2 = Inches(0.8)
start_y2 = Inches(2.55)
gap_x2 = Inches(0.33)
gap_y2 = Inches(0.25)

for i, (title, desc) in enumerate(impacts):
    row = i // 2
    col = i % 2
    x = start_x2 + col * (card_w2 + gap_x2)
    y = start_y2 + row * (card_h2 + gap_y2)

    ic = add_card(slide8, x, y, card_w2, card_h2, CARD_BG, CARD_BORDER)
    tb = slide8.shapes.add_textbox(x + Inches(0.2), y + Inches(0.18), card_w2 - Inches(0.4), card_h2 - Inches(0.36))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    
    p_t = tf.paragraphs[0]
    p_t.text = title
    p_t.font.name = FONT_HEADING
    p_t.font.size = Pt(13)
    p_t.font.bold = True
    p_t.font.color.rgb = GREEN_DARK
    
    p_d = tf.add_paragraph()
    p_d.text = desc
    p_d.font.name = FONT_BODY
    p_d.font.size = Pt(11)
    p_d.font.color.rgb = NAVY_MUTED
    p_d.space_before = Pt(6)

# Footer Note
note_card = add_card(slide8, Inches(0.8), Inches(6.65), Inches(11.733), Inches(0.45), GREEN_BG, GREEN_BORDER)
tf_n = note_card.text_frame
tf_n.vertical_anchor = MSO_ANCHOR.MIDDLE
p_n = tf_n.paragraphs[0]
p_n.text = "🎯 Designed specifically for Indian smallholder farming contexts, low-connectivity zones, and regional languages."
p_n.font.name = FONT_HEADING
p_n.font.size = Pt(10.5)
p_n.font.bold = True
p_n.font.color.rgb = GREEN_DARK
p_n.alignment = PP_ALIGN.CENTER


# =============================================================
# SLIDE 9: CONCLUSION (Simple, Bold, Memorable - User's Request!)
# =============================================================
slide9 = prs.slides.add_slide(blank_layout)
set_slide_background(slide9, BG_LIGHT)

# Hero Closing Card
close_card = add_card(slide9, Inches(0.8), Inches(0.8), Inches(11.733), Inches(5.6), NAVY_HERO, None)

tb_c = slide9.shapes.add_textbox(Inches(1.2), Inches(1.15), Inches(10.933), Inches(4.8))
tf_c = tb_c.text_frame
tf_c.word_wrap = True
tf_c.margin_left = tf_c.margin_right = tf_c.margin_top = tf_c.margin_bottom = 0

add_pill(slide9, Inches(1.2), Inches(1.15), Inches(3.2), Inches(0.35),
         "CONCLUSION & VISION", NAVY_CARD, GREEN_PRIMARY, font_size=10, bold=True)

# Main Punchy Headline
pc_title = tf_c.paragraphs[0]
pc_title.text = "\nProtect the Crop Before the Loss."
pc_title.font.name = FONT_HEADING
pc_title.font.size = Pt(38)
pc_title.font.bold = True
pc_title.font.color.rgb = TEXT_WHITE

# 4 Key Action Cards
actions_pill_bar = add_card(slide9, Inches(1.2), Inches(2.7), Inches(10.933), Inches(0.85), NAVY_CARD, None)
tf_ap = actions_pill_bar.text_frame
tf_ap.vertical_anchor = MSO_ANCHOR.MIDDLE
p_ap = tf_ap.paragraphs[0]
p_ap.text = "🌦️ PREDICT      •      🛡️ PROTECT      •      📸 VERIFY      •      🔄 ADAPT"
p_ap.font.name = FONT_HEADING
p_ap.font.size = Pt(17)
p_ap.font.bold = True
p_ap.font.color.rgb = GREEN_PRIMARY
p_ap.alignment = PP_ALIGN.CENTER

# Project Name & Tagline
tb_id = slide9.shapes.add_textbox(Inches(1.2), Inches(3.75), Inches(10.933), Inches(1.0))
tf_id = tb_id.text_frame
tf_id.word_wrap = True
tf_id.margin_left = tf_id.margin_right = tf_id.margin_top = tf_id.margin_bottom = 0

p_name = tf_id.paragraphs[0]
p_name.text = "FARMSHIELD AI"
p_name.font.name = FONT_HEADING
p_name.font.size = Pt(24)
p_name.font.bold = True
p_name.font.color.rgb = TEXT_WHITE

p_tagline = tf_id.add_paragraph()
p_tagline.text = "From Climate Prediction to Crop Protection"
p_tagline.font.name = FONT_BODY
p_tagline.font.size = Pt(14)
p_tagline.font.color.rgb = GREEN_PRIMARY
p_tagline.space_before = Pt(3)

# The Core Takeaway Banner (The #1 thing to prove clearly)
takeaway_box = add_card(slide9, Inches(1.2), Inches(4.85), Inches(10.933), Inches(0.9), GREEN_BG, GREEN_BORDER)
tf_tk = takeaway_box.text_frame
tf_tk.vertical_anchor = MSO_ANCHOR.MIDDLE
tf_tk.margin_left = tf_tk.margin_right = Inches(0.25)
p_tk = tf_tk.paragraphs[0]
p_tk.text = "“FarmShield converts a weather warning into a crop-specific intervention and then uses field evidence to update the risk.”"
p_tk.font.name = FONT_HEADING
p_tk.font.size = Pt(12)
p_tk.font.bold = True
p_tk.font.color.rgb = GREEN_DARK
p_tk.alignment = PP_ALIGN.CENTER

# Bottom Footer
foot_c = slide9.shapes.add_textbox(Inches(0.8), Inches(6.75), Inches(11.733), Inches(0.4))
tf_fc = foot_c.text_frame
tf_fc.margin_left = tf_fc.margin_right = tf_fc.margin_top = tf_fc.margin_bottom = 0
p_fc = tf_fc.paragraphs[0]
p_fc.text = "PCCOE International Grand Challenge: 2026 • Pune, India • Theme: AI for Climate Change"
p_fc.font.name = FONT_HEADING
p_fc.font.size = Pt(11)
p_fc.font.color.rgb = TEXT_MUTED
p_fc.alignment = PP_ALIGN.CENTER

# -------------------------------------------------------------
# SAVE PRESENTATION (Graceful fallback if file is open in PPT)
# -------------------------------------------------------------
saved_files = []
for fname in ["FarmShield_AI_Presentation.pptx", "sample ppt format- Indradhanu 2026 (1) - FarmShield AI.pptx"]:
    try:
        prs.save(fname)
        saved_files.append(fname)
    except PermissionError:
        alt_fname = fname.replace(".pptx", "_updated.pptx")
        try:
            prs.save(alt_fname)
            saved_files.append(alt_fname)
        except Exception as e:
            print(f"Could not save {alt_fname}: {e}")

print(f"Success: Presentation saved with {len(prs.slides)} slides to: {', '.join(saved_files)}")



