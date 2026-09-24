/* Painterly field cards.
   Edit freely: each card is one recipe. Tags drive the filters:
   subject: kids | adults | family | none
   light:   golden | blue | day | night
   weather: clear | overcast | fog | snow | storm
   season:  spring | summer | autumn | winter
   painting.wiki: English Wikipedia article titles to try, in order.
   painting.commons: fallback search on Wikimedia Commons. */

window.CARDS = [
{
  id: "vermeer-window",
  title: "Vermeer Window Portrait",
  kind: "Portrait",
  painting: { title: "The Milkmaid", artist: "Johannes Vermeer", year: "c. 1658", museum: "Rijksmuseum, Amsterdam",
    wiki: ["The_Milkmaid_(Vermeer)"], commons: "Vermeer Het melkmeisje Google Art Project" },
  mood: "Quiet absorption in a simple task, lit by one cool opening.",
  palette: ["#e3d6b8", "#c9a13b", "#2f4f8f", "#5b4a36", "#1b2230"],
  tags: { subject: ["kids", "adults"], light: ["day"], weather: ["clear", "overcast", "fog", "snow", "storm"], season: ["spring", "summer", "autumn", "winter"] },
  glance: { when: "Any daytime hour, overcast is best", lens: "GF 80mm f/1.7", exposure: "f/2.8, 1/125, spot +0.7 EV" },
  steal: [
    "Light enters from one side, high, and wraps the face and hands.",
    "The wall behind is lit but graded: brighter near the window, darker away from it.",
    "The subject is busy with a task, eyes down, unaware of the viewer.",
    "Cool light on the space, warm colours on the objects: lead-tin yellow and ultramarine."
  ],
  when: "Any daytime hour with soft light. Overcast or a window facing away from the sun is ideal. If sun hits the opening directly, hang a sheer cloth over it.",
  where: "A window, barn door, stable, shed or covered porch: any opening with open sky outside and a dim interior. Museum farms, heritage villages and old houses are ideal because the walls and furniture already look right.",
  direction: {
    pose: "Subject 1 to 1.5 m from the opening, body roughly parallel to it, face turned toward the light. Camera at about 90° to the window so the light rakes across. Hands matter as much as the face: give them something to do.",
    prompts: [
      "Pour the water from the jug into the bowl. Slower. Slower than that.",
      "Read the letter, but don't tell me what it says.",
      "Knead the bread like it's the last loaf in town.",
      "Look out the window: is it going to rain?"
    ]
  },
  wardrobe: [
    "Off-white linen blouse or smock",
    "Headscarf or linen cap",
    "Ochre or mustard jacket, bodice or knit cardigan",
    "Indigo or ultramarine apron or skirt",
    "Pearl drop earring (adults)",
    "Nothing printed, no visible elastic or zippers"
  ],
  props: ["Earthenware jug and bowl", "Round loaf of bread", "Folded letter or old map", "Brass pot or pewter plate", "Wicker basket"],
  light: {
    direction: "Side light from the opening, slightly in front of the subject, from camera left if you can (Vermeer's side).",
    ratio: "About 1:4 (2 stops between lit and shadow side).",
    notes: "Close every other door and curtain. A second light source kills the look. If the shadow side goes fully black, a white card far away gives it a sliver back."
  },
  kit: ["GF 80mm f/1.7 (half-length with the room)", "Contax 645 140mm f/2.8 (head and shoulders)", "5-in-1 reflector (black side for negative fill)", "Sheer white cloth and clamps for direct sun", "Dark cloth to hang on the shadow side"],
  settings: [
    ["Mode", "M, or A with auto ISO"],
    ["Aperture", "f/2.8 to f/4 so hands and task are sharp"],
    ["Shutter", "1/125 or faster for kids, 1/60 for still adults with IBIS"],
    ["ISO", "Auto, max 3200"],
    ["White balance", "Fixed 5200K; auto kills the window's coolness"],
    ["Film simulation", "Classic Chrome or Nostalgic Neg (RAW + JPEG)"],
    ["Tone", "Highlight -1, Shadow +1"],
    ["Metering", "Spot on the lit cheek, then +0.7 EV"],
    ["Focus", "Eye AF, or single small point on the near eye"],
    ["Shutter type", "Mechanical"]
  ],
  post: [
    "Neutral profile, WB around 5200K, lit skin at roughly 70 to 75%.",
    "Pull shadows down, then lift the very deepest black slightly for an oil-paint matte.",
    "Colour grade: shadows toward blue (hue 220, sat 8), highlights warm (hue 50, sat 10).",
    "HSL: yellows and blues up a touch, greens down.",
    "Dodge face, hands and the object of the task. Burn walls and corners until the eye lands on the task.",
    "Remove modern details: outlets, screws, window hardware.",
    "Crop 4:5 and add fine grain."
  ],
  breakers: ["Light switches, outlets, modern window frames or screens", "Synthetic fabric shine or sneakers", "A lamp or second light source in frame", "Subject smiling at the camera"],
  fallback: "No good window? Put the subject in a doorway facing out and shoot from inside. No daylight at all: a strobe in a large softbox outside the window, gelled 1/4 CTO.",
  duration: "Kids: 10 to 15 minutes. Keep the task real (actual water in the jug) and it holds their attention."
},
{
  id: "rembrandt-forest-edge",
  title: "Rembrandt Forest Edge",
  kind: "Portrait",
  painting: { title: "Titus at his Desk", artist: "Rembrandt van Rijn", year: "1655", museum: "Museum Boijmans Van Beuningen, Rotterdam",
    wiki: ["Titus_at_a_Lectern", "Titus_at_His_Desk"], commons: "Rembrandt Titus at his desk Boijmans" },
  mood: "A face surfacing out of darkness: inward, serious, warm.",
  palette: ["#e6c89a", "#a86b2d", "#8e2f22", "#3b2a1c", "#141a22"],
  tags: { subject: ["kids", "adults"], light: ["day", "golden"], weather: ["clear", "overcast"], season: ["spring", "summer", "autumn"] },
  glance: { when: "Late afternoon or overcast, in open shade", lens: "Contax 645 140mm f/2.8", exposure: "f/2.8, 1/250, spot +0.7 EV" },
  steal: [
    "One high light from the upper side; the rest of the picture falls into warm dark brown.",
    "The background disappears entirely. Nothing competes with the face.",
    "A single accent colour (the red cap).",
    "A thoughtful, unposed gaze past the viewer."
  ],
  when: "Late afternoon with soft light, or any time on an overcast day. Avoid midday top light unless you use the canopy trick in the fallback.",
  where: "A forest edge facing a clearing or field: the subject stands just inside the tree line, facing the open sky, with deep forest behind. A barn doorway or covered bridge works the same way.",
  direction: {
    pose: "Place the subject so the bright sky is about 45° to one side and slightly above. Turn the face until a small triangle of light appears on the shadow cheek under the eye. Chin slightly down, eyes up toward the light for catchlights.",
    prompts: [
      "Think about the hardest question you know.",
      "Rest your chin on your hand, like you're tired of homework.",
      "Watch that bird on the branch up there (point toward the light).",
      "Lean on the fence and look at the field."
    ]
  },
  wardrobe: ["Dark wool or earth-brown coat", "Linen shirt showing at the collar", "Beret or cap, red for the single accent", "Knit or fur collar in winter", "No logos, no zippers at the neck"],
  props: ["Old book", "Quill or pen and paper", "Walking stick", "Leather satchel", "Unlit lantern"],
  light: {
    direction: "Open sky at 45° to the side, slightly above the face. The tree canopy overhead blocks top light.",
    ratio: "About 1:8 (3 stops). Background at least 3 stops darker than the lit cheek.",
    notes: "Negative fill is the whole trick: black on the shadow side to stop the forest floor and sky bouncing light back in."
  },
  kit: ["Contax 645 140mm f/2.8 (head and shoulders)", "Canon 135mm f/2L (alternative)", "GF 80mm f/1.7 (half-length)", "5-in-1 reflector, black side", "Black cloth or v-flat for the shadow side", "Optional: speedlight in 60 to 90 cm octa, 1/4 CTO"],
  settings: [
    ["Mode", "M"],
    ["Aperture", "f/2.8 to f/4"],
    ["Shutter", "1/250"],
    ["ISO", "As needed; the GFX is clean to 3200"],
    ["White balance", "Fixed 5000K"],
    ["Film simulation", "Nostalgic Neg or Classic Chrome"],
    ["Tone", "Highlight -1, Shadow +2"],
    ["Metering", "Spot on the lit cheek, +0.7 EV. The meter will say underexposed: ignore it"],
    ["Focus", "Eye AF on the lit eye"]
  ],
  post: [
    "Warm WB, skin tones first.",
    "Burn the background to near black, then add a heavy radial vignette.",
    "Dodge the triangle, forehead and nose bridge. Burn the ears and the edge of the far cheek.",
    "Kill bright greens: saturation down hard, hue toward olive. Rembrandt has no green.",
    "Classic version: shadows toward warm brown. Your blue-black version: shadows toward blue (hue 220, sat 10).",
    "Remove green colour cast from skin (add a touch of magenta to the skin mask).",
    "Crop 4:5 or 3:4 and add grain."
  ],
  breakers: ["Patches of bright sky behind the head", "Green light bouncing onto skin from foliage", "Modern glasses, zippers, logos", "Face too evenly lit (no triangle, no falloff)"],
  fallback: "Harsh sun: go deeper into the forest and find a gap in the canopy where a small spot of sun lands on the face only. Expose for that spot. Instant chiaroscuro.",
  duration: "Kids: 10 minutes of stillness at most. Alternate with a running game, then come back."
},
{
  id: "golden-fairytale-child",
  title: "Golden Fairytale Child",
  kind: "Portrait",
  painting: { title: "Autumn Leaves", artist: "John Everett Millais", year: "1856", museum: "Manchester Art Gallery",
    wiki: ["Autumn_Leaves_(Millais)", "Autumn_Leaves_(painting)"], commons: "Millais Autumn Leaves 1856" },
  mood: "Children in the last warm light, as if the moment is already a memory.",
  palette: ["#f0c77a", "#b8742f", "#6f3d2a", "#4a5a3a", "#27303b"],
  tags: { subject: ["kids", "family"], light: ["golden"], weather: ["clear", "fog"], season: ["spring", "summer", "autumn"] },
  glance: { when: "Last 45 minutes before sunset", lens: "Canon 135mm f/2L", exposure: "f/2, 1/500, +1.3 EV" },
  steal: [
    "Figures lit from behind by a glowing dusk sky.",
    "Calm, direct gazes: the children look at the viewer without performing.",
    "A darker background band (trees, hill) behind glowing hair.",
    "Seasonal activity in the hands (leaves, flowers, baskets)."
  ],
  when: "The last 45 minutes before sunset or the first after sunrise, sun below about 10°. Start setting up 15 minutes before it gets good.",
  where: "Meadow, orchard, field edge, hilltop with a tree line, leaf piles. Choose an angle where the background behind the child is in shadow (trees, a hill) so the rim light on hair glows against dark.",
  direction: {
    pose: "Sun behind the child at about 4 or 8 o'clock, not dead behind: rim on the hair plus a little light across one cheek. Camera at the child's eye level, not above.",
    prompts: [
      "Throw the leaves up and watch them fall.",
      "Carry the basket to me slowly, like it's very full.",
      "Blow the dandelion and make a wish.",
      "Hold hands and walk away from me. Look back when I say your name."
    ]
  },
  wardrobe: ["Wool pinafore or smock", "Knit cardigan in cream, rust, mustard or moss", "Lace or linen collar", "Felt cap or bonnet", "Wool socks with leather boots, or barefoot in summer", "Flower crown", "No neon, no puffer jackets"],
  props: ["Wicker basket", "Apples", "Bundle of leaves or wheat", "Wooden toy", "A small animal if you can (lamb, rabbit, chicken)"],
  light: {
    direction: "Backlight from low sun, 30 to 45° off the lens axis.",
    ratio: "About 1:2. Soft and luminous, not chiaroscuro.",
    notes: "Let a little flare in by letting the sun graze the front element: it lowers contrast and reads as painted haze. Use the hood to control how much."
  },
  kit: ["Canon 135mm f/2L", "Contax 645 140mm f/2.8", "GF 80mm f/1.7 for two or more kids", "Reflector, gold/sunlight or white side", "Helper or stand for the reflector", "Snacks"],
  settings: [
    ["Mode", "M, or A with exposure compensation"],
    ["Aperture", "f/2 for isolation, f/2.8 when kids move toward you"],
    ["Shutter", "1/500 or faster (running kids, falling leaves)"],
    ["ISO", "Auto"],
    ["White balance", "6000 to 6500K (or Shade) to amplify the gold"],
    ["Film simulation", "Nostalgic Neg"],
    ["Tone", "Highlight -2 to protect the rim light"],
    ["Exposure", "+1 to +1.7 EV; the backlight fools the meter"],
    ["Focus", "AF-C with face/eye detect; switch to zone if it hunts"],
    ["Drive", "Continuous high, short bursts"]
  ],
  post: [
    "Lift shadows: this look has luminous shadows, not black ones.",
    "Colour grade: highlights warm (hue 45, sat 20), shadows slightly teal (hue 200, sat 8).",
    "Skin: orange hue -5, saturation -10.",
    "Greens toward yellow and olive.",
    "Dehaze -10 to -20 on the background only (masked).",
    "Gentle glow on highlights: a blurred copy at 10 to 15% opacity.",
    "Dodge the face slightly. Add grain."
  ],
  breakers: ["White, colourless blown sky", "Plastic hair clips or toys", "Kids squinting into the sun (you've put the sun in front)", "Busy bright background"],
  fallback: "Overcast: backlight doesn't exist today. Switch to Misty Meadow, or keep the wardrobe and do the Vermeer doorway.",
  duration: "20 minutes of real golden light. Plan games, not poses."
},
{
  id: "blue-hour-lantern",
  title: "Blue Hour Lantern Portrait",
  kind: "Portrait",
  painting: { title: "Carnation, Lily, Lily, Rose", artist: "John Singer Sargent", year: "1885 to 1886", museum: "Tate Britain, London",
    wiki: ["Carnation,_Lily,_Lily,_Rose"], commons: "Sargent Carnation Lily Lily Rose" },
  mood: "Twilight hush: small warm lights in a cool world.",
  palette: ["#f3e2b0", "#e0a24a", "#7f93a8", "#45566b", "#1f2a36"],
  tags: { subject: ["kids", "family"], light: ["blue", "night"], weather: ["clear", "overcast"], season: ["spring", "summer", "autumn", "winter"] },
  glance: { when: "15 to 35 minutes after sunset", lens: "GF 80mm f/1.7", exposure: "f/1.7, 1/125, ISO 1600 to 6400" },
  steal: [
    "Two colour temperatures: cool blue-violet ambient, warm lantern glow from below.",
    "White dresses that catch both colours.",
    "Flowers in the foreground and around the figures.",
    "Children absorbed in the lanterns, not looking at the viewer."
  ],
  when: "15 to 35 minutes after sunset. Sargent painted this in the few minutes of dusk each evening over two summers: the window is short, so set up in daylight.",
  where: "Garden, flower bed, tall grass, park or orchard. Check that no street lights or car headlights fall in frame.",
  direction: {
    pose: "Kids holding or lighting lanterns, faces lit from the lantern below and in front. Shoot from slightly above their eye level so the lantern light fills the face.",
    prompts: [
      "Hold the lantern very still, like a sleeping bird.",
      "Whisper your wish into the lantern.",
      "Hang the lanterns on the branch, gently.",
      "Find the brightest flower with your lantern."
    ]
  },
  wardrobe: ["White or cream dresses or shirts", "Lace details", "Flowers in the hair", "Bare arms in summer, cream knits in autumn"],
  props: ["Paper lanterns with LED tealights (no open flame near kids)", "Candle lantern in glass for adults", "Lilies, roses, tall grass", "Spare tealights"],
  light: {
    direction: "Ambient skylight from above and all around (cool). Lantern from below and in front (warm).",
    ratio: "Ambient about 1 stop under the lantern-lit face.",
    notes: "Boost the lantern with a small warm LED (2700K, very low power) hidden behind it or held low at camera side. No flash."
  },
  kit: ["GF 80mm f/1.7", "Canon 135mm f/2L", "Small LED panel at 2700K with diffusion", "LED tealights and paper lanterns", "Tripod for the scene shots", "Headlamp for the walk back"],
  settings: [
    ["Mode", "M"],
    ["Aperture", "f/1.7 to f/2"],
    ["Shutter", "1/125 (IBIS on, kids still)"],
    ["ISO", "1600 to 6400"],
    ["White balance", "Fixed 5000 to 5500K: sky goes blue, lantern stays warm"],
    ["Film simulation", "Classic Chrome or Pro Neg. Std"],
    ["Metering", "Spot on the lantern-lit face; keep the lantern itself from clipping"],
    ["Focus", "Single point on the eye; magnify if AF hunts in low light"]
  ],
  post: [
    "Keep the two temperatures apart: shadows and midtones hue 225 sat 12, highlights hue 40 sat 18.",
    "Orange luminance up for faces; blue saturation up slightly, luminance down.",
    "Moderate noise reduction, then grain on top.",
    "Burn the edges and background.",
    "Keep detail in the lantern highlights."
  ],
  breakers: ["Street lights or headlights", "Cold white LEDs visible", "String lights (read modern)", "Sky already black: you arrived too late"],
  fallback: "Missed the window? Full darkness becomes a Georges de La Tour candle portrait: one lantern, black background, f/1.7, ISO 6400.",
  duration: "About 20 minutes of usable blue. Everything set up in daylight."
},
{
  id: "misty-meadow-300",
  title: "Misty Meadow Figure",
  kind: "Portrait",
  painting: { title: "The Song of the Lark", artist: "Jules Breton", year: "1884", museum: "Art Institute of Chicago",
    wiki: ["The_Song_of_the_Lark_(Jules_Breton)", "The_Song_of_the_Lark_(painting)"], commons: "Jules Breton The Song of the Lark" },
  mood: "A single figure alone in a vast soft field at dawn.",
  palette: ["#e9a55a", "#a05a2c", "#6d6a4b", "#4d5b54", "#2a3038"],
  tags: { subject: ["kids", "adults"], light: ["golden"], weather: ["fog", "clear"], season: ["spring", "summer", "autumn"] },
  glance: { when: "Sunrise to 45 minutes after, with mist", lens: "Canon 300mm f/2.8L", exposure: "f/2.8, 1/1000, +1 EV" },
  steal: [
    "The sun sits on the horizon behind the figure.",
    "Everything reduces to two or three tones.",
    "Barefoot, working clothes, a tool in hand.",
    "The figure pauses mid-task, gaze lifted."
  ],
  when: "Sunrise to 45 minutes after, on a morning following a clear, calm, cold night near water (that's when mist forms). Evening haze in the last hour before sunset works too.",
  where: "Large field, hayfield, pasture or lakeshore with 50 to 150 m of open ground. The background should be far away: a tree line or hill.",
  direction: {
    pose: "You stand 30 to 60 m away. Agree on gestures beforehand (wave means stop, arm up means look up), or use walkie-talkies. Let them walk and repeat.",
    prompts: [
      "Walk slowly along the grass toward the sun. Stop when I wave.",
      "Listen for a bird. Look up when you hear it.",
      "Carry the bundle on your hip and walk to the tree.",
      "Stand still and count ten breaths."
    ]
  },
  wardrobe: ["Long skirt or smock", "Headscarf", "Simple linen or wool in earth tones", "One colour accent readable at distance (a red scarf)", "Barefoot or worn leather"],
  props: ["Wooden rake or scythe (blade covered)", "Basket", "Bundle of wheat or hay", "Shepherd's staff", "A dog or goat if available"],
  light: {
    direction: "Low sun behind or side-behind the figure, through mist.",
    ratio: "Very low contrast: the mist is both diffuser and fill.",
    notes: "Mist burns off fast once the sun clears the trees. Be in position before sunrise."
  },
  kit: ["Canon 300mm f/2.8L", "Monopod", "Contax 645 140mm f/2.8 for closer frames", "Walkie-talkies", "Lens cloth (dew)"],
  settings: [
    ["Mode", "M, or A with compensation"],
    ["Aperture", "f/2.8 to f/4"],
    ["Shutter", "1/500 to 1/1000"],
    ["ISO", "Auto"],
    ["White balance", "5500 to 6000K"],
    ["Film simulation", "Eterna (low contrast) or Nostalgic Neg"],
    ["Exposure", "+0.7 to +1.3 EV; the meter reads mist as grey"],
    ["Focus", "AF-C, zone"],
    ["Drive", "Continuous high"],
    ["Stabilisation", "IBIS on"]
  ],
  post: [
    "Keep contrast low; lift blacks well above zero.",
    "Warm the sun side, cool the far side (graduated colour masks).",
    "Graduated burn on the sky or ground to hold the eye on the figure.",
    "Dodge the figure's face and hands.",
    "Crop vertical 3:4 or 4:5, as Breton did."
  ],
  breakers: ["Fences, power lines, tractor tracks", "Distant houses or cars", "Bright synthetic clothing", "Scan the background with the 300 before placing the subject"],
  fallback: "No mist: shoot straight into the last 20 minutes of sun for natural haze, or switch to Harvest Genre Scene.",
  duration: "The mist gives you 20 to 40 minutes. The subject can rest between walks."
},
{
  id: "winter-fairytale",
  title: "Winter Fairytale",
  kind: "Portrait",
  painting: { title: "Winter Landscape with Ice Skaters", artist: "Hendrick Avercamp", year: "c. 1608", museum: "Rijksmuseum, Amsterdam",
    wiki: ["Winter_Landscape_with_Ice_Skaters"], commons: "Avercamp Winter landscape with ice skaters Rijksmuseum" },
  mood: "Warm figures in a cold, glowing world.",
  palette: ["#eef0ea", "#b33a2b", "#c59a45", "#2e4a3c", "#8ea3b8"],
  tags: { subject: ["kids", "family"], light: ["golden", "day"], weather: ["clear", "snow"], season: ["winter"] },
  glance: { when: "Winter golden hour (starts mid-afternoon)", lens: "Canon 135mm f/2L", exposure: "f/2, 1/500, +1.7 EV" },
  steal: [
    "Warm clothing colours against a pale, cool world.",
    "Many small activities: skating, pulling sleds, talking.",
    "Pale luminous sky, high horizon.",
    "Snow as a giant reflector: soft, shadowless faces."
  ],
  when: "Winter golden hour, which starts mid-afternoon (sunset around 16:15 in December). Best after a fresh snowfall, or during light snowfall with the sun low.",
  where: "Snowy field, frozen pond (check ice safety), forest trail, sugar shack, sledding hill.",
  direction: {
    pose: "Backlit falling snow and backlit breath are the magic. Put the sun behind them and shoot toward it.",
    prompts: [
      "Catch snowflakes on your tongue.",
      "Blow the snow off your mittens toward me.",
      "Pull the sled up the hill.",
      "Whisper a secret into your brother's hat."
    ]
  },
  wardrobe: ["Wool coats in red, ochre or forest green", "Knit scarves and mittens", "Fur or knit hats", "Sheepskin", "Ceinture fléchée for a Québécois touch", "No puffer jackets or ski gear: the number one modern giveaway"],
  props: ["Wooden sled or toboggan", "Lantern", "Vintage leather skates", "Basket with pine branches", "Thermos with steam"],
  light: {
    direction: "Low backlight or side-backlight; snow bounces fill into faces.",
    ratio: "About 1:2.",
    notes: "Shadows on snow are naturally blue. Protect that: fixed white balance."
  },
  kit: ["Canon 135mm f/2L", "Canon 300mm f/2.8L (falling snow compressed into bokeh)", "GF 80mm f/1.7", "3 batteries in an inside pocket (cold drains them)", "Ziploc bag to prevent condensation indoors", "Hand warmers for the kids"],
  settings: [
    ["Mode", "M"],
    ["Aperture", "f/2 to f/2.8"],
    ["Shutter", "1/500 (1/250 minimum to freeze flakes)"],
    ["ISO", "Auto"],
    ["White balance", "Fixed 5500K"],
    ["Film simulation", "Nostalgic Neg"],
    ["Exposure", "+1.3 to +2 EV for snow"],
    ["Focus", "AF-C, eye detect; falling snow can distract AF, use zone"]
  ],
  post: [
    "Snow white but not clipped; check the highlight warning.",
    "Shadows blue (hue 220, sat 15).",
    "Warm skin and clothing; reds and oranges saturation up slightly.",
    "Dodge the backlit flakes and breath.",
    "Light vignette, grain."
  ],
  breakers: ["Puffer jackets, ski logos, neon", "Footprints in the foreground snow (walk around, not through)", "Blown white sky with no colour", "Red noses and runny faces (bring tissues)"],
  fallback: "Overcast snow day: go close with the 135, faces framed by fur hats. Or go wide with the Contax 35 for an Avercamp crowd scene.",
  duration: "15 to 20 minutes in the cold for kids. Warm up in the car between sets."
},
{
  id: "harvest-genre",
  title: "Harvest Genre Scene",
  kind: "Portrait",
  painting: { title: "The Gleaners", artist: "Jean-François Millet", year: "1857", museum: "Musée d'Orsay, Paris",
    wiki: ["The_Gleaners"], commons: "Millet The Gleaners Orsay" },
  mood: "Honest work, bent backs, dignity, late sun.",
  palette: ["#e3c98f", "#b98a4b", "#8a4a32", "#4d5d6b", "#3a3a2c"],
  tags: { subject: ["kids", "adults", "family"], light: ["golden", "day"], weather: ["clear", "overcast"], season: ["summer", "autumn"] },
  glance: { when: "Last 90 minutes before sunset, harvest season", lens: "GF 80mm f/1.7", exposure: "f/4, 1/500, -0.3 EV" },
  steal: [
    "Figures in a frieze, bent in action.",
    "Gestures matter more than faces.",
    "A muted earth palette with one blue and one red.",
    "Raking side light, long shadows."
  ],
  when: "The last 90 minutes before sunset, late summer to autumn. Pick-your-own season (September for apples) gives you real work to photograph.",
  where: "Orchards, pumpkin patches, vegetable gardens, hay fields, market gardens.",
  direction: {
    pose: "Action, not poses. Photograph the actual work for 10 minutes until they forget you. Group of two or three moving in the same rhythm.",
    prompts: [
      "Fill the basket before I count to fifty.",
      "Pass the apples down the line.",
      "Pull the carrots and shake off the dirt.",
      "Carry the sack together to the cart."
    ]
  },
  wardrobe: ["Headscarves", "Aprons", "Rolled sleeves, suspenders, flat caps", "Linen or cotton in faded blue, rust and ochre", "Worn leather boots"],
  props: ["Baskets", "Burlap sacks", "Wooden crates", "Rake or pitchfork", "Wheelbarrow"],
  light: {
    direction: "Low raking side or side-back light.",
    ratio: "About 1:3.",
    notes: "If you get close, a gold reflector brings a face out of shadow; otherwise let faces stay in shade."
  },
  kit: ["GF 80mm f/1.7 (the frieze)", "Contax 645 35mm f/3.5 (wide with sky)", "Canon 300mm f/2.8L (compressed field)", "Gold reflector"],
  settings: [
    ["Mode", "A"],
    ["Aperture", "f/4 to f/5.6 for several figures in focus"],
    ["Shutter", "1/500"],
    ["ISO", "Auto"],
    ["White balance", "Fixed 5500K"],
    ["Film simulation", "Classic Chrome"],
    ["Exposure", "-0.3 EV to protect the sky"],
    ["Focus", "AF-C, zone"]
  ],
  post: [
    "Global saturation -15, then warmth back in.",
    "Push the palette toward ochre and sienna; greens to olive.",
    "Burn the top of the sky.",
    "Dodge the figures, especially backs and hands.",
    "Crop horizontal 4:3 or 5:4."
  ],
  breakers: ["Plastic crates or buckets", "Rubber boots in bright colours", "Tractors, farm signage", "Phones in pockets"],
  fallback: "Overcast: move the harvest props into a barn doorway and shoot it Vermeer-style.",
  duration: "As long as the work lasts. Real work keeps kids engaged."
},
{
  id: "golden-city-vista",
  title: "Golden Hour City Vista",
  kind: "Landscape",
  painting: { title: "Seaport with the Embarkation of the Queen of Sheba", artist: "Claude Lorrain", year: "1648", museum: "National Gallery, London",
    wiki: ["Seaport_with_the_Embarkation_of_the_Queen_of_Sheba"], commons: "Claude Lorrain Embarkation of the Queen of Sheba" },
  mood: "The city as a classical scene bathed in low gold.",
  palette: ["#f4d38a", "#d69a4a", "#8a7a5a", "#4f5d6a", "#232a33"],
  tags: { subject: ["none"], light: ["golden", "blue"], weather: ["clear"], season: ["spring", "summer", "autumn", "winter"] },
  glance: { when: "30 to 60 minutes before sunset", lens: "GF 80mm f/1.7", exposure: "f/8, ISO 100, bracket ±2" },
  steal: [
    "The sun low in or near the frame.",
    "Layers of depth fading into warm haze.",
    "Dark framing masses at the sides (buildings, trees): the repoussoir.",
    "Water reflecting the gold."
  ],
  when: "30 to 60 minutes before sunset, or the same after sunrise. Clear sky with a few high clouds is ideal.",
  where: "Any elevated vantage facing or perpendicular to the sun: observation towers, lookouts, rooftops, parking-garage tops, bridges, hills.",
  direction: {
    pose: "Composition: a dark mass on one side, light in the middle, layered depth. Place the sun low and partly hidden behind a structure to avoid a blown disc.",
    prompts: [
      "Find three layers: dark foreground, mid-ground city, glowing background.",
      "Look for water or glass reflecting the sun.",
      "Wait for the sun to touch an edge."
    ]
  },
  wardrobe: [],
  props: [],
  light: {
    direction: "Against the light or at 90° to it.",
    ratio: "Scene range too high for one frame: bracket.",
    notes: "Shooting through glass: lens flat against the window, dark cloth or rubber hood around it, no polariser."
  },
  kit: ["GF 80mm f/1.7 (compressed layers)", "Contax 645 35mm f/3.5 (wide)", "Canon 300mm f/2.8L (sun and skyline layers)", "Tripod", "Lens hood", "Dark cloth for window reflections"],
  settings: [
    ["Mode", "A"],
    ["Aperture", "f/5.6 to f/8"],
    ["ISO", "100"],
    ["White balance", "Fixed 5500K to keep the gold"],
    ["Film simulation", "Classic Chrome or Nostalgic Neg"],
    ["Bracketing", "-2 / 0 / +2"],
    ["Exposure", "-0.7 EV to protect the sky"],
    ["Focus", "One third into the scene"],
    ["Release", "2 s self-timer, IBIS off on tripod"]
  ],
  post: [
    "Merge brackets, gently (no halos).",
    "Graduated burn on the top of the sky.",
    "Negative dehaze on the distant layers for atmosphere.",
    "Warm highlights, blue shadows in the streets.",
    "Darken the framing masses.",
    "Remove cranes, billboards and anything with a logo."
  ],
  breakers: ["HDR halos", "Neon signs and billboards", "Sharp cars in the foreground", "Construction cranes"],
  fallback: "Flat grey sky: wait for blue hour when the city lights come on and turn it into a nocturne.",
  duration: "Arrive 90 minutes before sunset to find the frame."
},
{
  id: "misty-valley-dawn",
  title: "Misty Valley Dawn",
  kind: "Landscape",
  painting: { title: "Wanderer above the Sea of Fog", artist: "Caspar David Friedrich", year: "c. 1818", museum: "Hamburger Kunsthalle",
    wiki: ["Wanderer_above_the_Sea_of_Fog"], commons: "Friedrich Wanderer above the sea of fog" },
  mood: "Solitude above the clouds.",
  palette: ["#e8dccb", "#b9b0a8", "#7f8a96", "#4a5563", "#22282f"],
  tags: { subject: ["none", "adults"], light: ["golden"], weather: ["fog"], season: ["spring", "summer", "autumn", "winter"] },
  glance: { when: "Sunrise after a clear, calm night", lens: "Contax 645 35mm f/3.5", exposure: "f/8, ISO 100, bracket" },
  steal: [
    "A figure seen from behind (Rückenfigur), dead centre.",
    "Fog layers receding into the distance.",
    "Cool, pale palette with a warm sky.",
    "Dark rock in the foreground."
  ],
  when: "Sunrise, plus or minus 30 minutes, after a clear, calm, cold night. Check the forecast: dew point close to temperature and wind under 10 km/h. Spring and autumn are best.",
  where: "Any summit or ridge above a river valley or lake. The hike up in the dark is part of it.",
  direction: {
    pose: "Optional figure from behind on a rock, centred, standing still. Dark wool coat, no hiking colours.",
    prompts: [
      "Stand on the rock and look at the farthest ridge.",
      "Walking stick planted, weight on one leg."
    ]
  },
  wardrobe: ["Dark wool coat for the figure", "Hat, no cap"],
  props: ["Walking stick"],
  light: {
    direction: "Side or backlight from the rising sun.",
    ratio: "Low contrast in the fog, high toward the sun: bracket.",
    notes: "The best fog shapes often come 10 to 20 minutes after sunrise as it starts to move."
  },
  kit: ["Contax 645 35mm f/3.5", "GF 80mm f/1.7", "Canon 300mm f/2.8L (pick out ridge layers)", "Tripod", "Headlamp", "Warm layers"],
  settings: [
    ["Mode", "A"],
    ["Aperture", "f/8"],
    ["ISO", "100"],
    ["White balance", "Fixed 5000K"],
    ["Film simulation", "Eterna or Classic Chrome"],
    ["Bracketing", "-2 / 0 / +2"],
    ["Focus", "On the figure, or one third into the scene"],
    ["Release", "2 s timer"]
  ],
  post: [
    "Work layer by layer with luminance masks.",
    "Fog cool blue-grey; sky warm.",
    "Lift blacks for atmosphere.",
    "Dodge the fog edges, burn the foreground rock."
  ],
  breakers: ["Bright hiking jackets", "Trail signs and cairns", "Other hikers on the ridge"],
  fallback: "No fog: point the 300 into the sun and shoot the layers of ridges in the haze.",
  duration: "40 minutes around sunrise."
},
{
  id: "forest-cathedral",
  title: "Forest Cathedral",
  kind: "Landscape",
  painting: { title: "Morning in a Pine Forest", artist: "Ivan Shishkin and Konstantin Savitsky", year: "1889", museum: "Tretyakov Gallery, Moscow",
    wiki: ["Morning_in_a_Pine_Forest"], commons: "Shishkin Morning in a Pine Forest" },
  mood: "Light falling like incense through old trees.",
  palette: ["#e7d59a", "#a7a06a", "#3f5a46", "#2c3b31", "#1a2226"],
  tags: { subject: ["none", "kids"], light: ["golden", "day"], weather: ["fog", "clear"], season: ["spring", "summer", "autumn"] },
  glance: { when: "1 to 2 hours after sunrise, with mist", lens: "Contax 645 35mm f/3.5", exposure: "f/8, ISO 200, -1 EV" },
  steal: [
    "Shafts of light through mist.",
    "A fallen tree as the foreground stage.",
    "Small living figures (here, bear cubs) for scale.",
    "Deep greens turning gold where the light hits."
  ],
  when: "1 to 2 hours after sunrise while mist lingers, or right after rain when the sun breaks through.",
  where: "Mature conifer or mixed forest, old growth, a ravine.",
  direction: {
    pose: "Optional small figure (a child) in the ray, not looking at the camera. Or no people at all.",
    prompts: [
      "Walk into the patch of light and stop.",
      "Look for mushrooms around the fallen tree."
    ]
  },
  wardrobe: ["Muted wool if a figure is included"],
  props: [],
  light: {
    direction: "Into the light, sun behind trees.",
    ratio: "Extreme: expose for the rays.",
    notes: "Rays need particles: mist, dust, or smoke. No particles, no rays."
  },
  kit: ["Contax 645 35mm f/3.5", "GF 80mm f/1.7", "Contax 645 140mm f/2.8 (details)", "Tripod"],
  settings: [
    ["Mode", "A"],
    ["Aperture", "f/5.6 to f/8"],
    ["ISO", "100 to 400"],
    ["White balance", "Fixed 5500K"],
    ["Film simulation", "Classic Chrome"],
    ["Exposure", "-1 EV; spot on the brightest ray and protect it"],
    ["Bracketing", "-2 / 0 / +2"]
  ],
  post: [
    "Deep forest greens: green hue slightly toward blue-green, saturation -20, luminance -20.",
    "Yellow luminance up so the rays glow.",
    "Dodge the rays, burn the edges and floor.",
    "Crop out or burn bright sky patches."
  ],
  breakers: ["Bright sky patches through the canopy", "Trail markers", "Neon green (unmanaged greens)"],
  fallback: "No rays: overcast forest intimacy. Use the 140 for moss, ferns and bark details.",
  duration: "Rays last 20 to 30 minutes as the mist lifts."
},
{
  id: "storm-light",
  title: "Storm Light",
  kind: "Landscape",
  painting: { title: "The Oxbow (View from Mount Holyoke)", artist: "Thomas Cole", year: "1836", museum: "The Met, New York",
    wiki: ["The_Oxbow"], commons: "Thomas Cole View from Mount Holyoke Oxbow" },
  mood: "Weather passing; one patch of sun on the land.",
  palette: ["#e5d7a8", "#8f9a5a", "#4e5c4a", "#3f4650", "#1c2129"],
  tags: { subject: ["none"], light: ["day", "golden"], weather: ["storm"], season: ["spring", "summer", "autumn"] },
  glance: { when: "As a storm front clears", lens: "GF 80mm f/1.7", exposure: "f/8, ISO 100, bracket" },
  steal: [
    "Half the scene under storm, half in sun.",
    "A diagonal dividing dark and light.",
    "One spotlit patch of land.",
    "A small human element (the painter himself) for scale."
  ],
  when: "Late afternoon as a storm front passes or showers clear. Watch the radar for the trailing edge.",
  where: "A high viewpoint over a river, valley or farmland.",
  direction: {
    pose: "Composition: wait for the moving patch of sun to land on the most interesting feature. Patience is the technique.",
    prompts: ["Pre-frame, then wait for the light to arrive."]
  },
  wardrobe: [],
  props: [],
  light: {
    direction: "Sun breaking through behind or beside you, dark sky opposite.",
    ratio: "Very high: bracket.",
    notes: "Leave exposed summits at the first thunder."
  },
  kit: ["GF 80mm f/1.7", "Contax 645 35mm f/3.5", "Canon 300mm f/2.8L (isolate the sunlit patch)", "Tripod", "Rain cover"],
  settings: [
    ["Mode", "A"],
    ["Aperture", "f/8"],
    ["ISO", "100"],
    ["White balance", "Fixed 5500K"],
    ["Film simulation", "Classic Chrome"],
    ["Bracketing", "-2 / 0 / +2"],
    ["Release", "2 s timer"]
  ],
  post: [
    "Burn the storm side hard.",
    "Dodge the sunlit patch.",
    "Warm the sun, cool the storm.",
    "Go easy on clarity; paintings don't have crunchy clouds."
  ],
  breakers: ["Over-sharpened clouds", "Power lines", "Crunchy HDR look"],
  fallback: "The storm won't clear: shoot the wall of rain with the 300.",
  duration: "Moments, but you may wait an hour for them."
},
{
  id: "autumn-grandeur",
  title: "Autumn Grandeur",
  kind: "Landscape",
  painting: { title: "Autumn – On the Hudson River", artist: "Jasper Francis Cropsey", year: "1860", museum: "National Gallery of Art, Washington",
    wiki: ["Autumn_–_On_the_Hudson_River", "Autumn_-_On_the_Hudson_River"], commons: "Cropsey Autumn On the Hudson River" },
  mood: "Abundance: a golden valley at peak colour.",
  palette: ["#f0c46a", "#c7682f", "#8b3a2a", "#6f86a0", "#2c3530"],
  tags: { subject: ["none"], light: ["golden", "day"], weather: ["clear", "overcast"], season: ["autumn"] },
  glance: { when: "Peak foliage, golden hour", lens: "Contax 645 35mm f/3.5", exposure: "f/8, ISO 100" },
  steal: [
    "Warm foreground trees framing the view.",
    "Water in the middle ground.",
    "Hills receding into blue.",
    "Tiny figures or cattle for scale."
  ],
  when: "Peak foliage (late September to mid-October in southern Quebec) at golden hour, ideally with light haze.",
  where: "River valleys, lakes with hills, farmland with a view.",
  direction: {
    pose: "Composition: foreground tree mass, mid-ground water, background hills. Optional tiny figure.",
    prompts: ["Find a foreground tree to frame one side."]
  },
  wardrobe: [],
  props: [],
  light: {
    direction: "Side light for texture in the foliage.",
    ratio: "Moderate.",
    notes: "Overcast days make foliage glow evenly; sun makes it sparkle but harsh."
  },
  kit: ["Contax 645 35mm f/3.5", "GF 80mm f/1.7", "Canon 300mm f/2.8L (compressed hillsides)", "Tripod"],
  settings: [
    ["Mode", "A"],
    ["Aperture", "f/8"],
    ["ISO", "100"],
    ["White balance", "Fixed 5500K"],
    ["Film simulation", "Classic Chrome"],
    ["Exposure", "-0.3 EV"]
  ],
  post: [
    "Keep oranges from going neon: orange saturation -10, red -15.",
    "Distance blue; add warm haze to the mid-ground.",
    "Burn the foreground frame.",
    "Crop wide: 5:3 or 2:1 panoramic like the Hudson River painters."
  ],
  breakers: ["Neon oversaturated leaves", "Roads and cars", "Houses with vinyl siding"],
  fallback: "Rain: go close with the 140 on wet leaves and bark.",
  duration: "Peak lasts about a week. Watch the foliage reports."
},
{
  id: "still-water-mirror",
  title: "Still Water Mirror",
  kind: "Landscape",
  painting: { title: "Twilight in the Wilderness", artist: "Frederic Edwin Church", year: "1860", museum: "Cleveland Museum of Art",
    wiki: ["Twilight_in_the_Wilderness"], commons: "Twilight in the Wilderness Frederic Edwin Church" },
  palette: ["#f2c46b", "#d9673a", "#8e3b3b", "#3d4a5c", "#1c2224"],
  steal: [
    "The sky's colour repeated in still water below it.",
    "A dark, silhouetted tree line separating sky from reflection.",
    "Warm sky above, cool shadowed land: the gold and blue-black split in one frame.",
    "A low horizon, so the sky and its reflection dominate."
  ],
  palette: ["#efe4c8", "#c9b58a", "#7d8f86", "#465a55", "#232b2d"],
  tags: { subject: ["none"], light: ["golden", "blue"], weather: ["clear", "overcast", "fog"], season: ["spring", "summer", "autumn"] },
  glance: { when: "Windless dawn or dusk", lens: "GF 80mm f/1.7", exposure: "f/8, ISO 100, tripod" },
  when: "Windless dawn or dusk. Dawn is usually calmer. Blue hour extends the look.",
  where: "Small lake, pond or slow river with a tree line or building on the far bank.",
  direction: {
    pose: "Composition: horizon near the middle, reflection nearly equal. Keep the frame simple.",
    prompts: ["Wait for the ripples to settle between gusts."]
  },
  wardrobe: [],
  props: [],
  light: {
    direction: "Soft light, sun low or just set.",
    ratio: "Low.",
    notes: "No polariser: it kills the reflection you came for."
  },
  kit: ["GF 80mm f/1.7", "Contax 645 35mm f/3.5", "Tripod", "ND filter if you have one (smooth water)"],
  settings: [
    ["Mode", "A"],
    ["Aperture", "f/8 to f/11"],
    ["ISO", "100"],
    ["White balance", "Fixed 5500K"],
    ["Film simulation", "Eterna or Classic Chrome"],
    ["Release", "2 s timer, IBIS off"]
  ],
  post: [
    "Soft pastel grade, cool overall with one warm spot.",
    "Match the reflection's tones to the sky, slightly darker.",
    "Lift blacks, low clarity."
  ],
  breakers: ["Wind ripples", "Docks with plastic kayaks", "Bright buoys"],
  fallback: "Wind picks up: switch to a long exposure with ND, or move to a sheltered cove.",
  duration: "Calm windows are short; be there early."
},
{
  id: "winter-magpie",
  title: "Blue Shadow Snow",
  kind: "Landscape",
  painting: { title: "The Magpie", artist: "Claude Monet", year: "1868 to 1869", museum: "Musée d'Orsay, Paris",
    wiki: ["The_Magpie_(Monet)", "The_Magpie_(painting)"], commons: "Monet The Magpie Orsay" },
  mood: "Snow glowing gold and blue, with one small living thing.",
  palette: ["#f4eee0", "#e8d6a8", "#a8b6c8", "#6f7f96", "#39414d"],
  tags: { subject: ["none"], light: ["day", "golden"], weather: ["clear"], season: ["winter"] },
  glance: { when: "Sunny afternoon after snowfall", lens: "GF 80mm f/1.7", exposure: "f/8, ISO 100, +1.7 EV" },
  steal: [
    "Backlit snow: shadows of a fence fall toward the viewer.",
    "Blue-violet shadows, warm cream highlights.",
    "A single bird or figure as the accent.",
    "Almost no dark values."
  ],
  when: "A sunny afternoon after fresh snowfall, sun low. Winter golden hour starts mid-afternoon.",
  where: "Fences, fields, snowy lanes, hedges, farm buildings.",
  direction: {
    pose: "Composition: shoot toward the sun so shadows come at you. One small accent: a bird, a child, a sled.",
    prompts: ["Find a fence line with long shadows.", "Wait for a bird to land."]
  },
  wardrobe: ["Red or ochre coat if a figure is included"],
  props: [],
  light: {
    direction: "Backlight, low sun.",
    ratio: "Low: snow fills everything.",
    notes: "Blue shadows are the point. Fixed white balance, never auto."
  },
  kit: ["GF 80mm f/1.7", "Contax 645 35mm f/3.5", "Canon 300mm f/2.8L (for the bird)", "Spare batteries warm"],
  settings: [
    ["Mode", "A"],
    ["Aperture", "f/8"],
    ["ISO", "100"],
    ["White balance", "Fixed 5500K"],
    ["Film simulation", "Classic Chrome"],
    ["Exposure", "+1.3 to +1.7 EV"]
  ],
  post: [
    "Shadows blue-violet (hue 230, sat 15); highlights warm cream.",
    "Never neutralise the shadows.",
    "Keep the whole image in high key.",
    "Protect snow texture in the highlights."
  ],
  breakers: ["Grey, underexposed snow", "Neutral grey shadows (auto WB)", "Tire tracks"],
  fallback: "Overcast: switch to Winter Fairytale close-ups.",
  duration: "The low sun gives you about an hour."
}
];
