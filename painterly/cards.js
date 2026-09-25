/* Painterly field cards.
   Edit freely: each card is one recipe. Tags drive the filters:
   subject: kids | adults | family | none
   light:   golden | blue | day | night
   weather: clear | overcast | fog | snow | storm
   season:  spring | summer | autumn | winter
   place:   water | street | farm | hills | forest | garden | indoors
   style:   masters | impressionism | pointillism
   painting.wiki: English Wikipedia article titles to try, in order.
   painting.commons: fallback search on Wikimedia Commons.

   images (optional, replaces painting): a gallery the viewer taps through.
     { kind: "painting", file, title, artist, year, museum, wiki: [...] }
     { kind: "painting", file, ..., commons: "File:<exact Wikimedia Commons file name>" }
     { kind: "photo", file, unsplash: "<photo id>", by: "<photographer>" }
     `file` is relative to img/. Run fetch_paintings.py to download missing files.

   plan (optional): top-down diagram of the setup, drawn instead of guessing from text.
     Positions are clock hours around the subject as drawn on screen:
     the camera is always at 6, 12 is behind the subject, 9 is frame left, 3 is frame right.
     camera:  { dist }                     metres from the subject
     subject: { facing, label }            clock hour the face points to
     lights:  [{ kind, at, dist, label }]  kind: window | sky | sun | lantern
     mods:    [{ kind, at, dist, label }]  kind: black | white | gold
     zones:   [{ at, label }]              what lies in that direction (background, trees) */

window.CARDS = [
{
  id: "vermeer-window",
  title: "Vermeer Window Portrait",
  kind: "Portrait",
  images: [
    { kind: "painting", file: "vermeer-window/milkmaid.jpg", title: "The Milkmaid", artist: "Johannes Vermeer", year: "c. 1658", museum: "Rijksmuseum, Amsterdam",
      wiki: ["The_Milkmaid_(Vermeer)"] },
    { kind: "painting", file: "vermeer-window/letter-open-window.jpg", title: "Girl Reading a Letter at an Open Window", artist: "Johannes Vermeer", year: "c. 1657 to 1659", museum: "Gemäldegalerie Alte Meister, Dresden",
      wiki: ["Girl_Reading_a_Letter_at_an_Open_Window"] },
    { kind: "photo", file: "vermeer-window/unsplash-ynz-KiVxaB8.jpg", unsplash: "ynz-KiVxaB8", by: "Gantas Vaičiulėnas" },
    { kind: "painting", file: "vermeer-window/water-pitcher.jpg", title: "Young Woman with a Water Pitcher", artist: "Johannes Vermeer", year: "c. 1662", museum: "The Met, New York",
      wiki: ["Young_Woman_with_a_Water_Pitcher"] },
    { kind: "photo", file: "vermeer-window/unsplash-PUX5LdNIdOM.jpg", unsplash: "PUX5LdNIdOM", by: "Nicole Geri" }
  ],
  mood: "Quiet absorption in a simple task, lit by one cool opening.",
  palette: ["#e3d6b8", "#c9a13b", "#2f4f8f", "#5b4a36", "#1b2230"],
  tags: { subject: ["kids", "adults"], light: ["day"], weather: ["clear", "overcast", "fog", "snow", "storm"], season: ["spring", "summer", "autumn", "winter"], place: ["indoors", "farm"], style: ["masters"] },
  plan: {
    camera: { dist: 3 },
    subject: { facing: 8.5, label: "Face turned to the light" },
    lights: [{ kind: "window", at: 9, dist: 1.2, label: "Window 1 to 1.5 m" }],
    mods: [{ kind: "black", at: 3, dist: 1.6, label: "Dark cloth" }],
    zones: [{ at: 12, label: "Lit wall, graded" }]
  },
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
  images: [
    { kind: "painting", file: "rembrandt-forest-edge/titus-desk.jpg", title: "Titus at his Desk", artist: "Rembrandt van Rijn", year: "1655", museum: "Museum Boijmans Van Beuningen, Rotterdam", wiki: ["Titus_at_a_Lectern", "Titus_at_His_Desk"] },
    { kind: "photo", file: "rembrandt-forest-edge/unsplash-uNaSs6pRzj4.jpg", unsplash: "uNaSs6pRzj4", by: "Esther Masscheleyn" },
    { kind: "painting", file: "rembrandt-forest-edge/girl-at-a-window.jpg", title: "Girl at a Window", artist: "Rembrandt van Rijn", year: "1645", museum: "Dulwich Picture Gallery, London", commons: "File:Rembrandt Harmensz van Rijn - Girl at a Window - Google Art Project.jpg" },
    { kind: "photo", file: "rembrandt-forest-edge/unsplash-XbxQbS1NMKE.jpg", unsplash: "XbxQbS1NMKE", by: "Janko Ferlič" },
    { kind: "painting", file: "rembrandt-forest-edge/two-circles.jpg", title: "Self-Portrait with Two Circles", artist: "Rembrandt van Rijn", year: "c. 1665 to 1669", museum: "Kenwood House, London", wiki: ["Self-Portrait_with_Two_Circles"] }
  ],
  mood: "A face surfacing out of darkness: inward, serious, warm.",
  palette: ["#e6c89a", "#a86b2d", "#8e2f22", "#3b2a1c", "#141a22"],
  tags: { subject: ["kids", "adults"], light: ["day", "golden"], weather: ["clear", "overcast"], season: ["spring", "summer", "autumn"], place: ["forest", "farm"], style: ["masters"] },
  plan: {
    camera: { dist: 2.5 },
    subject: { facing: 6, label: "Turn until the cheek triangle shows" },
    lights: [{ kind: "sky", at: 7.5, dist: 4, label: "Open sky, 45° and above" }],
    mods: [{ kind: "black", at: 3.5, dist: 1.2, label: "Black flag" }],
    zones: [{ at: 12, label: "Deep forest" }]
  },
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
  images: [
    { kind: "painting", file: "golden-fairytale-child/autumn-leaves.jpg", title: "Autumn Leaves", artist: "John Everett Millais", year: "1856", museum: "Manchester Art Gallery", wiki: ["Autumn_Leaves_(Millais)"] },
    { kind: "photo", file: "golden-fairytale-child/unsplash-8jCCf6kw3LU.jpg", unsplash: "8jCCf6kw3LU", by: "Aakash Makwana" },
    { kind: "painting", file: "golden-fairytale-child/snap-the-whip.jpg", title: "Snap the Whip", artist: "Winslow Homer", year: "1872", museum: "Butler Institute of American Art, Youngstown", commons: "File:Winslow Homer - Snap the Whip (Butler Institute of American Art).jpg" },
    { kind: "photo", file: "golden-fairytale-child/unsplash-OEi76hVLRko.jpg", unsplash: "OEi76hVLRko", by: "Vitalii Khodzinskyi" }
  ],
  mood: "Children in the last warm light, as if the moment is already a memory.",
  palette: ["#f0c77a", "#b8742f", "#6f3d2a", "#4a5a3a", "#27303b"],
  tags: { subject: ["kids", "family"], light: ["golden"], weather: ["clear", "fog"], season: ["spring", "summer", "autumn"], place: ["farm", "hills", "garden"], style: ["masters"] },
  plan: {
    camera: { dist: 6, label: "At the child's eye level" },
    subject: { facing: 6 },
    lights: [{ kind: "sun", at: 10.5, dist: 20, label: "Low sun, not dead behind" }],
    mods: [{ kind: "gold", at: 4.5, dist: 1.2, label: "Gold reflector" }],
    zones: [{ at: 12, label: "Trees in shadow" }]
  },
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
  images: [
    { kind: "painting", file: "blue-hour-lantern/carnation-lily.jpg", title: "Carnation, Lily, Lily, Rose", artist: "John Singer Sargent", year: "1885 to 1886", museum: "Tate Britain, London", wiki: ["Carnation,_Lily,_Lily,_Rose"] },
    { kind: "photo", file: "blue-hour-lantern/unsplash-ZkcWw0wiTo0.jpg", unsplash: "ZkcWw0wiTo0", by: "Julia Florczak" },
    { kind: "painting", file: "blue-hour-lantern/skagen-summer-evening.jpg", title: "Summer Evening on Skagen's Southern Beach", artist: "Peder Severin Krøyer", year: "1893", museum: "Skagens Museum", wiki: ["Summer_Evening_on_Skagen's_Southern_Beach"] },
    { kind: "photo", file: "blue-hour-lantern/unsplash-aEL0oAJibJA.jpg", unsplash: "aEL0oAJibJA", by: "rehan shaik" },
    { kind: "painting", file: "blue-hour-lantern/hopeless-dawn.jpg", title: "A Hopeless Dawn", artist: "Frank Bramley", year: "1888", museum: "Tate Britain, London", commons: "File:Frank Bramley - A Hopeless Dawn 1888.jpg" }
  ],
  mood: "Twilight hush: small warm lights in a cool world.",
  palette: ["#f3e2b0", "#e0a24a", "#7f93a8", "#45566b", "#1f2a36"],
  tags: { subject: ["kids", "family"], light: ["blue", "night"], weather: ["clear", "overcast"], season: ["spring", "summer", "autumn", "winter"], place: ["garden", "farm"], style: ["masters", "impressionism"] },
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
  images: [
    { kind: "painting", file: "misty-meadow-300/song-of-the-lark.jpg", title: "The Song of the Lark", artist: "Jules Breton", year: "1884", museum: "Art Institute of Chicago", wiki: ["The_Song_of_the_Lark_(Jules_Breton)"] },
    { kind: "photo", file: "misty-meadow-300/unsplash-j4OKEDZZ5oY.jpg", unsplash: "j4OKEDZZ5oY", by: "Pouya Hajiebrahimi" },
    { kind: "painting", file: "misty-meadow-300/angelus.jpg", title: "The Angelus", artist: "Jean-François Millet", year: "1857 to 1859", museum: "Musée d'Orsay, Paris", wiki: ["The_Angelus_(painting)"] },
    { kind: "photo", file: "misty-meadow-300/unsplash-rACvP0D0KK0.jpg", unsplash: "rACvP0D0KK0", by: "Leonie Zettl" }
  ],
  mood: "A single figure alone in a vast soft field at dawn.",
  palette: ["#e9a55a", "#a05a2c", "#6d6a4b", "#4d5b54", "#2a3038"],
  tags: { subject: ["kids", "adults"], light: ["golden"], weather: ["fog", "clear"], season: ["spring", "summer", "autumn"], place: ["farm", "water"], style: ["masters"] },
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
  images: [
    { kind: "painting", file: "winter-fairytale/ice-skaters.jpg", title: "Winter Landscape with Ice Skaters", artist: "Hendrick Avercamp", year: "c. 1608", museum: "Rijksmuseum, Amsterdam", commons: "File:Avercamp, Hendrick - Winterlandschap met schaatsers - SK-A-1718.jpg" },
    { kind: "photo", file: "winter-fairytale/unsplash-cIJanQTb9u8.jpg", unsplash: "cIJanQTb9u8", by: "M G" },
    { kind: "painting", file: "winter-fairytale/hunters-in-the-snow.jpg", title: "The Hunters in the Snow", artist: "Pieter Bruegel the Elder", year: "1565", museum: "Kunsthistorisches Museum, Vienna", wiki: ["The_Hunters_in_the_Snow"] },
    { kind: "photo", file: "winter-fairytale/unsplash-msty1V5qc8U.jpg", unsplash: "msty1V5qc8U", by: "Vitolda Klein" }
  ],
  mood: "Warm figures in a cold, glowing world.",
  palette: ["#eef0ea", "#b33a2b", "#c59a45", "#2e4a3c", "#8ea3b8"],
  tags: { subject: ["kids", "family"], light: ["golden", "day"], weather: ["clear", "snow"], season: ["winter"], place: ["farm", "water", "forest", "hills"], style: ["masters"] },
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
  images: [
    { kind: "painting", file: "harvest-genre/gleaners.jpg", title: "The Gleaners", artist: "Jean-François Millet", year: "1857", museum: "Musée d'Orsay, Paris", wiki: ["The_Gleaners"] },
    { kind: "photo", file: "harvest-genre/unsplash-OhvkoOYlASk.jpg", unsplash: "OhvkoOYlASk", by: "Boudewijn Huysmans" },
    { kind: "painting", file: "harvest-genre/harvesters.jpg", title: "The Harvesters", artist: "Pieter Bruegel the Elder", year: "1565", museum: "The Met, New York", commons: "File:Pieter Bruegel the Elder- The Harvesters - Google Art Project.jpg" },
    { kind: "photo", file: "harvest-genre/unsplash-Cb0x53ecH50.jpg", unsplash: "Cb0x53ecH50", by: "Mieke Campbell" }
  ],
  mood: "Honest work, bent backs, dignity, late sun.",
  palette: ["#e3c98f", "#b98a4b", "#8a4a32", "#4d5d6b", "#3a3a2c"],
  tags: { subject: ["kids", "adults", "family"], light: ["golden", "day"], weather: ["clear", "overcast"], season: ["summer", "autumn"], place: ["farm", "garden"], style: ["masters"] },
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
  images: [
    { kind: "painting", file: "golden-city-vista/queen-of-sheba.jpg", title: "Seaport with the Embarkation of the Queen of Sheba", artist: "Claude Lorrain", year: "1648", museum: "National Gallery, London", wiki: ["Seaport_with_the_Embarkation_of_the_Queen_of_Sheba"] },
    { kind: "photo", file: "golden-city-vista/unsplash-Y4RGiczCLYM.jpg", unsplash: "Y4RGiczCLYM", by: "Leo_Visions" },
    { kind: "painting", file: "golden-city-vista/dido-building-carthage.jpg", title: "Dido Building Carthage", artist: "J. M. W. Turner", year: "1815", museum: "National Gallery, London", wiki: ["Dido_building_Carthage"] },
    { kind: "photo", file: "golden-city-vista/unsplash-f3uezdb4yuA.jpg", unsplash: "f3uezdb4yuA", by: "Zhang qc" },
    { kind: "painting", file: "golden-city-vista/impression-sunrise.jpg", title: "Impression, Sunrise", artist: "Claude Monet", year: "1872", museum: "Musée Marmottan Monet, Paris", wiki: ["Impression,_Sunrise"] }
  ],
  mood: "The city as a classical scene bathed in low gold.",
  palette: ["#f4d38a", "#d69a4a", "#8a7a5a", "#4f5d6a", "#232a33"],
  tags: { subject: ["none"], light: ["golden", "blue"], weather: ["clear"], season: ["spring", "summer", "autumn", "winter"], place: ["street", "water", "hills"], style: ["masters"] },
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
  images: [
    { kind: "painting", file: "misty-valley-dawn/wanderer.jpg", title: "Wanderer above the Sea of Fog", artist: "Caspar David Friedrich", year: "c. 1818", museum: "Hamburger Kunsthalle", wiki: ["Wanderer_above_the_Sea_of_Fog"] },
    { kind: "photo", file: "misty-valley-dawn/unsplash-5tsth5IUg8I.jpg", unsplash: "5tsth5IUg8I", by: "iuliu illes" },
    { kind: "painting", file: "misty-valley-dawn/morning-mist.jpg", title: "Morning Mist in the Mountains", artist: "Caspar David Friedrich", year: "1808", museum: "Heidecksburg Castle, Rudolstadt", commons: "File:Friedrich - Morning mist in the mountains.jpg" },
    { kind: "photo", file: "misty-valley-dawn/unsplash-8vHxfKOqkLw.jpg", unsplash: "8vHxfKOqkLw", by: "Diwei Zhu" }
  ],
  mood: "Solitude above the clouds.",
  palette: ["#e8dccb", "#b9b0a8", "#7f8a96", "#4a5563", "#22282f"],
  tags: { subject: ["none", "adults"], light: ["golden"], weather: ["fog"], season: ["spring", "summer", "autumn", "winter"], place: ["hills", "water"], style: ["masters"] },
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
  images: [
    { kind: "painting", file: "forest-cathedral/morning-pine-forest.jpg", title: "Morning in a Pine Forest", artist: "Ivan Shishkin and Konstantin Savitsky", year: "1889", museum: "Tretyakov Gallery, Moscow", wiki: ["Morning_in_a_Pine_Forest"] },
    { kind: "photo", file: "forest-cathedral/unsplash-tLNRTxieD7k.jpg", unsplash: "tLNRTxieD7k", by: "Kristine Weilert" },
    { kind: "painting", file: "forest-cathedral/in-the-woods.jpg", title: "In the Woods", artist: "Asher Brown Durand", year: "1855", museum: "The Met, New York", commons: "File:Durand Asher B In The Woods.jpg" },
    { kind: "photo", file: "forest-cathedral/unsplash-7aEhliQraPI.jpg", unsplash: "7aEhliQraPI", by: "Erik van Dijk" }
  ],
  mood: "Light falling like incense through old trees.",
  palette: ["#e7d59a", "#a7a06a", "#3f5a46", "#2c3b31", "#1a2226"],
  tags: { subject: ["none", "kids"], light: ["golden", "day"], weather: ["fog", "clear"], season: ["spring", "summer", "autumn"], place: ["forest"], style: ["masters"] },
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
  images: [
    { kind: "painting", file: "storm-light/oxbow.jpg", title: "The Oxbow (View from Mount Holyoke)", artist: "Thomas Cole", year: "1836", museum: "The Met, New York", wiki: ["The_Oxbow"] },
    { kind: "photo", file: "storm-light/unsplash-JRL_gXQwpeA.jpg", unsplash: "JRL_gXQwpeA", by: "Maria Budanova" },
    { kind: "painting", file: "storm-light/haarlem-bleaching-fields.jpg", title: "View of Haarlem with Bleaching Fields", artist: "Jacob van Ruisdael", year: "c. 1670 to 1675", museum: "Kunsthaus Zürich", wiki: ["View_of_Haarlem_with_Bleaching_Fields"] },
    { kind: "photo", file: "storm-light/unsplash-usyY_TmYbgw.jpg", unsplash: "usyY_TmYbgw", by: "Thomas-Olivier Guimond" },
    { kind: "painting", file: "storm-light/salisbury-meadows.jpg", title: "Salisbury Cathedral from the Meadows", artist: "John Constable", year: "1831", museum: "Tate Britain, London", wiki: ["Salisbury_Cathedral_from_the_Meadows"] }
  ],
  mood: "Weather passing; one patch of sun on the land.",
  palette: ["#e5d7a8", "#8f9a5a", "#4e5c4a", "#3f4650", "#1c2129"],
  tags: { subject: ["none"], light: ["day", "golden"], weather: ["storm"], season: ["spring", "summer", "autumn"], place: ["hills", "farm", "water"], style: ["masters"] },
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
  images: [
    { kind: "painting", file: "autumn-grandeur/autumn-hudson.jpg", title: "Autumn – On the Hudson River", artist: "Jasper Francis Cropsey", year: "1860", museum: "National Gallery of Art, Washington", wiki: ["Autumn_–_On_the_Hudson_River"] },
    { kind: "photo", file: "autumn-grandeur/unsplash-ipGnsZawLqY.jpg", unsplash: "ipGnsZawLqY", by: "Rob Wingate" },
    { kind: "painting", file: "autumn-grandeur/starrucca-viaduct.jpg", title: "Starrucca Viaduct, Pennsylvania", artist: "Jasper Francis Cropsey", year: "1865", museum: "Toledo Museum of Art", commons: "File:Jasper Francis Cropsey - Starrucca Viaduct, Pennsylvania - Google Art Project.jpg" },
    { kind: "photo", file: "autumn-grandeur/unsplash-k2V1H5bEWwY.jpg", unsplash: "k2V1H5bEWwY", by: "Rob Wicks" }
  ],
  mood: "Abundance: a golden valley at peak colour.",
  palette: ["#f0c46a", "#c7682f", "#8b3a2a", "#6f86a0", "#2c3530"],
  tags: { subject: ["none"], light: ["golden", "day"], weather: ["clear", "overcast"], season: ["autumn"], place: ["water", "hills", "farm"], style: ["masters"] },
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
  images: [
    { kind: "painting", file: "still-water-mirror/twilight-wilderness.jpg", title: "Twilight in the Wilderness", artist: "Frederic Edwin Church", year: "1860", museum: "Cleveland Museum of Art", wiki: ["Twilight_in_the_Wilderness"] },
    { kind: "photo", file: "still-water-mirror/unsplash-AbR69d3Xn6g.jpg", unsplash: "AbR69d3Xn6g", by: "Dana Luig" },
    { kind: "painting", file: "still-water-mirror/lake-george.jpg", title: "Lake George", artist: "John Frederick Kensett", year: "1869", museum: "The Met, New York", commons: "File:Kensett John F Lake George.jpg" },
    { kind: "photo", file: "still-water-mirror/unsplash-BiBM6WVuKUw.jpg", unsplash: "BiBM6WVuKUw", by: "Dylan Crawford" }
  ],
  mood: "The sky's last colour, doubled in water that doesn't move.",
  steal: [
    "The sky's colour repeated in still water below it.",
    "A dark, silhouetted tree line separating sky from reflection.",
    "Warm sky above, cool shadowed land: the gold and blue-black split in one frame.",
    "A low horizon, so the sky and its reflection dominate."
  ],
  palette: ["#efe4c8", "#c9b58a", "#7d8f86", "#465a55", "#232b2d"],
  tags: { subject: ["none"], light: ["golden", "blue"], weather: ["clear", "overcast", "fog"], season: ["spring", "summer", "autumn"], place: ["water"], style: ["masters"] },
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
  images: [
    { kind: "painting", file: "winter-magpie/magpie.jpg", title: "The Magpie", artist: "Claude Monet", year: "1868 to 1869", museum: "Musée d'Orsay, Paris", wiki: ["The_Magpie_(Monet)"] },
    { kind: "photo", file: "winter-magpie/unsplash-2TSNvwAQJYs.jpg", unsplash: "2TSNvwAQJYs", by: "Thao Nguyen" },
    { kind: "painting", file: "winter-magpie/hoarfrost.jpg", title: "Hoarfrost", artist: "Camille Pissarro", year: "1873", museum: "Musée d'Orsay, Paris", commons: "File:Camille Pissarro, Gelee blanche (Hoarfrost), 1873.jpg" },
    { kind: "photo", file: "winter-magpie/unsplash-e5mUQRUhUc.jpg", unsplash: "-e5mUQRUhUc", by: "Michael Hamments" }
  ],
  mood: "Snow glowing gold and blue, with one small living thing.",
  palette: ["#f4eee0", "#e8d6a8", "#a8b6c8", "#6f7f96", "#39414d"],
  tags: { subject: ["none"], light: ["day", "golden"], weather: ["clear"], season: ["winter"], place: ["farm"], style: ["impressionism"] },
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
},
{
  id: "parasol-hilltop",
  title: "Woman with a Parasol",
  kind: "Portrait",
  images: [
    { kind: "painting", file: "parasol-hilltop/madame-monet-and-son.jpg", title: "Woman with a Parasol – Madame Monet and Her Son", artist: "Claude Monet", year: "1875", museum: "National Gallery of Art, Washington", wiki: ["Woman_with_a_Parasol_–_Madame_Monet_and_Her_Son"] },
    { kind: "photo", file: "parasol-hilltop/unsplash-QWv1gY20P-g.jpg", unsplash: "QWv1gY20P-g", by: "Jovan Vasiljević" },
    { kind: "painting", file: "parasol-hilltop/parasol-facing-left.jpg", title: "Woman with a Parasol, Facing Left", artist: "Claude Monet", year: "1886", museum: "Musée d'Orsay, Paris", commons: "File:Monet - Essai de figure en plein air - femme à l'ombrelle tournée vers la gauche - Musée d’Orsay.jpg" },
    { kind: "photo", file: "parasol-hilltop/unsplash-HECNkX7TpSc.jpg", unsplash: "HECNkX7TpSc", by: "billow926" }
  ],
  mood: "A breezy summer afternoon, seen from below against moving clouds.",
  palette: ["#f4f0e4", "#a9c4dc", "#5b86b5", "#8aa35a", "#d8c27a"],
  tags: { subject: ["adults", "kids", "family"], light: ["day", "golden"], weather: ["clear"], season: ["spring", "summer"], place: ["hills", "farm", "garden"], style: ["impressionism"] },
  plan: {
    camera: { dist: 5, label: "Low, below their feet, tilted up" },
    subject: { facing: 5.5, label: "Paused mid-walk, glancing back down at you" },
    lights: [{ kind: "sun", at: 10.5, dist: 20, label: "Sun high, behind the shoulder" }],
    mods: [{ kind: "white", at: 4.5, dist: 1.5, label: "White reflector, low" }],
    zones: [{ at: 12, label: "Open sky and clouds" }]
  },
  glance: { when: "Mid-afternoon on a breezy day with cumulus", lens: "Contax 645 140mm f/2.8", exposure: "f/4, 1/1000, +0.7 EV" },
  steal: [
    "The camera looks up: the figure stands against sky, not landscape.",
    "Backlight makes the parasol glow; the face sits in soft coloured shade.",
    "Wind: the veil, the skirt and the grass all move the same way.",
    "Shadows are blue and green, never black."
  ],
  when: "Mid-afternoon to early golden hour in summer, with a breeze and scattered cumulus. Monet painted it in one sitting; the clouds change in minutes, so work fast.",
  where: "Any small rise: a meadow hill, dune, dyke or field edge where you can stand below the subject and see only sky behind them. Long grass or wildflowers at their feet.",
  direction: {
    pose: "Subject on the crest, you 4 to 6 m below and in front. Sun behind and to one side so the parasol is rim-lit. Ask them to walk along the crest, pause and turn back toward you. A child a few metres behind adds Monet's depth.",
    prompts: [
      "Walk along the top, then stop and look back as if I called your name.",
      "Hold the parasol against the wind, don't fight it.",
      "Let the scarf go wherever the wind takes it.",
      "(To the child) Walk up the hill behind her, slowly."
    ]
  },
  wardrobe: ["White or cream long dress in a light fabric that moves", "Sheer scarf or veil", "Straw hat", "Child: white shirt and straw hat", "Nothing dark, nothing printed"],
  props: ["Parasol: white, lace, or with a pale green lining", "Long sheer scarf"],
  light: {
    direction: "Sun behind and to one side, above the subject.",
    ratio: "About 1:2: sky and grass fill the shadow side with colour.",
    notes: "Let the parasol go translucent against the sun. Protect the highlights on the dress; the shade side should read blue-green, not grey."
  },
  kit: ["Contax 645 140mm f/2.8 (Zeiss colour and flare: made for this)", "Contax 645 35mm f/3.5 (wide and low, lots of sky)", "Canon 135mm f/2L (faster AF if they keep moving)", "White reflector", "Kneeling pad"],
  settings: [
    ["Mode", "A"],
    ["Aperture", "f/4: the face holds while the grass melts"],
    ["Shutter", "1/1000 or faster for the wind"],
    ["ISO", "Auto, base 100"],
    ["White balance", "Fixed 5800K"],
    ["Film simulation", "Astia (soft skin, bright colour) or Classic Neg."],
    ["Tone", "Highlight -1, Shadow -1, Colour +1"],
    ["Exposure", "+0.7 EV against the sky"],
    ["Focus", "AF-C with eye detect"]
  ],
  post: [
    "Protect the sky: pull highlights until the clouds keep their texture.",
    "Lift shadows and push them toward blue-green (hue 190, sat 12). No black anywhere.",
    "Clarity -20, texture -10: soft, not crunchy.",
    "Vibrance +20, saturation 0; blue and green luminance up a touch.",
    "Optional brushwork: Photoshop's Oil Paint filter on a copy at 15 to 25% opacity.",
    "Crop 4:5, figure large and slightly off-centre."
  ],
  breakers: ["Horizon or buildings behind the figure (get lower)", "Sun straight overhead: the parasol won't glow", "Stiff synthetic fabric that doesn't move", "Sunglasses"],
  fallback: "No wind: a helper out of frame lifts the scarf. Overcast: switch to Reading in the Garden.",
  duration: "Twenty minutes. The clouds change constantly, so keep shooting."
},
{
  id: "garden-reading",
  title: "Reading in the Garden",
  kind: "Portrait",
  images: [
    { kind: "painting", file: "garden-reading/morisot-reading.jpg", title: "Reading", artist: "Berthe Morisot", year: "1873", museum: "Cleveland Museum of Art", commons: "File:Berthe Morisot - La Lecture (1873).jpg" },
    { kind: "photo", file: "garden-reading/unsplash-VahrnykTFy0.jpg", unsplash: "VahrnykTFy0", by: "Yen Vu" },
    { kind: "painting", file: "garden-reading/monet-springtime.jpg", title: "Springtime", artist: "Claude Monet", year: "1872", museum: "Walters Art Museum, Baltimore", commons: "File:Claude Monet - Springtime - Google Art Project.jpg" },
    { kind: "photo", file: "garden-reading/unsplash-9CILN1ybspA.jpg", unsplash: "9CILN1ybspA", by: "Nguyen Thu Hoai" }
  ],
  mood: "Absorbed in a book while the world around softens into colour.",
  palette: ["#eef0e2", "#b9cfa1", "#6f9a6a", "#c7b6d8", "#f3d9c4"],
  tags: { subject: ["adults", "kids"], light: ["day"], weather: ["overcast", "clear"], season: ["spring", "summer", "autumn"], place: ["garden", "water", "farm"], style: ["impressionism"] },
  plan: {
    camera: { dist: 3.5, label: "At sitting height" },
    subject: { facing: 8, label: "Head down in the book, face in profile" },
    lights: [{ kind: "sky", at: 10, dist: 4, label: "Open sky or dappled shade" }],
    mods: [{ kind: "white", at: 7, dist: 1, label: "Pale blanket as bounce" }],
    zones: [{ at: 12, label: "Meadow or water, far away" }]
  },
  glance: { when: "Soft light: overcast, or dappled shade", lens: "Contax 645 140mm f/2.8", exposure: "f/2.8, 1/500, +0.7 EV" },
  steal: [
    "The sitter doesn't know we're there: eyes down, completely absorbed.",
    "The background dissolves into patches of colour, not detail.",
    "A pale dress picking up the colours around it: green from the grass, blue from the sky.",
    "A parasol or fan set aside in the grass as a quiet accent."
  ],
  when: "A bright overcast day, or morning and late afternoon in the dappled shade of a tree. Avoid hard midday sun on the face.",
  where: "Garden, park lawn, orchard, lakeside or riverbank. Pick a spot where the background is 20 m or more away so the 140 melts it.",
  direction: {
    pose: "Subject seated on the grass or a low bench, body at an angle to you, face in profile over the book. Shoot from sitting height. Frame loosely: the grass and the dress are half the picture.",
    prompts: [
      "Find the best line on the page and read it twice.",
      "Turn the page when you're ready, not for me.",
      "Rest the book on your knee and look out at the water."
    ]
  },
  wardrobe: ["White, cream or pale lilac dress with a full skirt", "Straw hat or bonnet", "A ribbon in one colour", "Bare feet or plain shoes"],
  props: ["Old cloth-bound book", "Parasol or fan, laid in the grass", "Blanket in a pale colour", "Basket"],
  light: {
    direction: "Soft top-side light from open sky or through leaves.",
    ratio: "About 1:2.",
    notes: "Dappled sun is fine on the dress and the grass, never on the face: a spot of sun on the nose reads as a blemish, not a highlight."
  },
  kit: ["Contax 645 140mm f/2.8 (dreamy fall-off, vivid greens)", "Canon 135mm f/2L", "GF 80mm f/1.7 (wider, more garden)", "Pale blanket", "Small stool for your own height"],
  settings: [
    ["Mode", "A"],
    ["Aperture", "f/2.8, wide open on the Contax"],
    ["Shutter", "1/250 or faster"],
    ["ISO", "Auto"],
    ["White balance", "Fixed 5500K on overcast days, 5000K in shade"],
    ["Film simulation", "Astia or Pro Neg. Std"],
    ["Tone", "Highlight -1, Shadow -2"],
    ["Exposure", "+0.7 to +1 EV for a high-key look"],
    ["Focus", "Eye AF, or single point on the near eye"]
  ],
  post: [
    "High key: lift exposure until the dress is bright but its folds still show.",
    "Blacks +20. The Impressionists had no black.",
    "Shadows toward blue-violet (hue 250, sat 10); highlights warm cream.",
    "Clarity -25 on the background only (masked).",
    "Greens: hue toward yellow, saturation -10, luminance up.",
    "Crop 4:5 or 5:4 with space around the figure."
  ],
  breakers: ["Phone in hand, earbuds", "A branded book cover", "Hard sun spots on the face", "Busy background close behind"],
  fallback: "Bright sun everywhere: put them in the shade at the edge of a tree or building and shoot toward the sunny garden for a glowing background.",
  duration: "As long as they keep reading, so ask them to actually read."
},
{
  id: "riverside-party",
  title: "Riverside Boating Party",
  kind: "Portrait",
  images: [
    { kind: "painting", file: "riverside-party/luncheon-boating-party.jpg", title: "Luncheon of the Boating Party", artist: "Pierre-Auguste Renoir", year: "1880 to 1881", museum: "The Phillips Collection, Washington", wiki: ["Luncheon_of_the_Boating_Party"] },
    { kind: "photo", file: "riverside-party/unsplash--7AxXbZekDE.jpg", unsplash: "-7AxXbZekDE", by: "Mason Dahl" },
    { kind: "painting", file: "riverside-party/moulin-de-la-galette.jpg", title: "Bal du moulin de la Galette", artist: "Pierre-Auguste Renoir", year: "1876", museum: "Musée d'Orsay, Paris", wiki: ["Bal_du_moulin_de_la_Galette"] },
    { kind: "photo", file: "riverside-party/unsplash-gkBwOHmFmxI.jpg", unsplash: "gkBwOHmFmxI", by: "Anne Nygård" },
    { kind: "painting", file: "riverside-party/caillebotte-boating-party.jpg", title: "Boating Party", artist: "Gustave Caillebotte", year: "c. 1877 to 1878", museum: "Musée d'Orsay, Paris", commons: "File:G. Caillebotte - La Partie de Bâteau.jpg" }
  ],
  mood: "Friends in summer shade by the water, light dropping through the leaves.",
  palette: ["#f2e6c9", "#e3a86b", "#4f7fa8", "#2f5a44", "#c9d8e0"],
  tags: { subject: ["adults", "family"], light: ["day", "golden"], weather: ["clear"], season: ["summer"], place: ["water", "garden"], style: ["impressionism"] },
  plan: {
    camera: { dist: 4 },
    subject: { facing: 6, label: "The group, turned toward each other" },
    lights: [{ kind: "sun", at: 1.5, dist: 20, label: "High sun through leaves" }],
    zones: [{ at: 12, label: "Bright river behind" }]
  },
  glance: { when: "Afternoon, under trees by the water", lens: "Contax 645 35mm f/3.5", exposure: "f/5.6, 1/250, +0.3 EV" },
  steal: [
    "Sun falling through leaves in coins of light on faces, hats and cloth.",
    "A crowded, informal group: people talking to each other, not to us.",
    "Warm skin and straw hats against cool blue-green shade.",
    "Water and sky glowing in the gaps."
  ],
  when: "A summer afternoon when the sun is high enough to come through a canopy in patches. Later, golden side light makes it warmer.",
  where: "A riverside terrace, dock, café garden or picnic spot under trees, with boats, oars or water behind.",
  direction: {
    pose: "Let the party happen. Set the table or blanket so the group faces in toward each other and slightly toward you. Move until the coins of light fall on hats and shoulders, not eyes. For the boating version, put one rower in the foreground and shoot low from the next boat or the dock.",
    prompts: [
      "Pour for each other, not for me.",
      "Tell the worst joke you know.",
      "(Rower) Pull long and slow, and look past me at the bank."
    ]
  },
  wardrobe: ["Straw boaters and wide-brimmed hats", "White and striped shirts, sleeves rolled", "Summer dresses in pale blue, white and rose", "Loosened ties, open waistcoats", "Nothing branded"],
  props: ["Glass bottles and stemmed glasses", "Fruit on a white tablecloth", "Oars and a wooden rowing boat", "A small dog"],
  light: {
    direction: "High sun broken up by leaves; bright river behind.",
    ratio: "Patchy: about 1:3 in the shade, much brighter in the sun spots.",
    notes: "Expose for the shaded faces and let the sun spots and river go bright. Renoir's shadows are blue-violet: fixed white balance keeps the shade cool."
  },
  kit: ["Contax 645 35mm f/3.5 (the whole table, Zeiss colour)", "GF 80mm f/1.7 (pairs and faces)", "Contax 645 140mm f/2.8 (from the bank to the boat)", "Reflector for a face lost in deep shade"],
  settings: [
    ["Mode", "A"],
    ["Aperture", "f/5.6 to f/8 for the group"],
    ["Shutter", "1/250"],
    ["ISO", "Auto"],
    ["White balance", "Fixed 5500K"],
    ["Film simulation", "Classic Neg. or Astia"],
    ["Tone", "Highlight -2 for the sun spots, Shadow -1"],
    ["Exposure", "+0.3 EV"],
    ["Focus", "Face detect, AF-C"]
  ],
  post: [
    "Warm the sunlit patches, cool the shade: highlights hue 45 sat 15, shadows hue 230 sat 12.",
    "Lift blacks so the shade stays luminous.",
    "Clarity -15 and a little glow on the highlights.",
    "Oranges and reds up for skin and fruit; blues up in the water.",
    "Crop 4:3 or 5:4 with figures cut by the frame edges, as Renoir did."
  ],
  breakers: ["Plastic cups and bottles", "Sunglasses and phones on the table", "Orange life jackets", "A motorboat behind"],
  fallback: "No shade trees: a café awning or a big parasol breaks up the sun. Overcast: shoot the boating version on the water, which works in flat light.",
  duration: "An hour. It gets better as people relax."
},
{
  id: "haystacks-series",
  title: "Haystacks at Sunset",
  kind: "Landscape",
  images: [
    { kind: "painting", file: "haystacks-series/sunset-snow-effect.jpg", title: "Stacks of Wheat (Sunset, Snow Effect)", artist: "Claude Monet", year: "1890 to 1891", museum: "Art Institute of Chicago", commons: "File:Claude Monet - Stacks of Wheat (Sunset, Snow Effect) - 1922.431 - Art Institute of Chicago.jpg" },
    { kind: "photo", file: "haystacks-series/unsplash-4jijsYHM1UE.jpg", unsplash: "4jijsYHM1UE", by: "Mihály Köles" },
    { kind: "painting", file: "haystacks-series/end-of-summer.jpg", title: "Stacks of Wheat (End of Summer)", artist: "Claude Monet", year: "1890 to 1891", museum: "Art Institute of Chicago", wiki: ["Haystacks_(Monet_series)"] },
    { kind: "photo", file: "haystacks-series/unsplash-mCd_HOTQLQ8.jpg", unsplash: "mCd_HOTQLQ8", by: "Jon Sailer" }
  ],
  mood: "One humble subject, painted again and again as the light changes it.",
  palette: ["#f3c77e", "#e27a4a", "#9a5b7a", "#5e6f9e", "#2f3550"],
  tags: { subject: ["none"], light: ["golden"], weather: ["clear", "overcast", "snow"], season: ["summer", "autumn", "winter"], place: ["farm"], style: ["impressionism"] },
  glance: { when: "Last hour before sunset, any season", lens: "Contax 645 210mm f/4", exposure: "f/5.6, ISO 100, -0.3 EV" },
  steal: [
    "The subject is the light, not the haystack.",
    "The stack goes dark against a coloured sky, and its shadow is violet, not black.",
    "Complementary colours: orange sky, blue-violet shadows.",
    "A series: same spot, different hours and seasons."
  ],
  when: "The last hour before sunset, and again at sunrise. Go back to the same stack in snow, frost, fog and summer haze.",
  where: "Hay or straw bales in a harvested field, from late July. Round bales work; old-style stacks are rare but worth finding.",
  direction: {
    pose: "Composition: one or two stacks, low horizon, sun behind or beside them. Stand well back with the 210 to press the stack against the sky and the tree line. Use the same tripod spot on every visit.",
    prompts: ["Mark your tripod spot with a stick so the series lines up.", "Shoot every ten minutes until the colour goes."]
  },
  wardrobe: [],
  props: [],
  light: {
    direction: "Low sun behind or beside the stacks.",
    ratio: "High toward the sun: bracket.",
    notes: "The best colour often comes 5 to 15 minutes after the sun drops below the horizon."
  },
  kit: ["Contax 645 210mm f/4 (the stack pressed against the sky)", "Contax 645 140mm f/2.8", "Contax 645 35mm f/3.5 (stack in the foreground, huge sky)", "Tripod", "Notebook for the series: date, time, weather"],
  settings: [
    ["Mode", "A"],
    ["Aperture", "f/5.6 to f/8"],
    ["ISO", "100"],
    ["White balance", "Fixed 5500K; auto kills the orange"],
    ["Film simulation", "Velvia for the sky, or Classic Chrome for a quieter series"],
    ["Bracketing", "-2 / 0 / +2"],
    ["Release", "2 s timer, IBIS off on the tripod"]
  ],
  post: [
    "Keep the shadow side of the stack coloured: shadows toward violet (hue 260, sat 15).",
    "Warm the sky without overdoing it: orange saturation -5, luminance +10.",
    "Lift blacks. Monet has no black.",
    "Clarity -20, texture -10.",
    "Edit the whole series with one preset so the differences are the light, not the edit."
  ],
  breakers: ["Plastic-wrapped bales", "Tractors or fences in the foreground", "Power lines on the horizon"],
  fallback: "Flat grey evening: shoot anyway. Monet painted grey days too, and the series needs them.",
  duration: "An hour per visit; a season for the series."
},
{
  id: "sea-cliffs",
  title: "Cliffs at Étretat",
  kind: "Landscape",
  images: [
    { kind: "painting", file: "sea-cliffs/cliffs-at-etretat.jpg", title: "The Cliffs at Étretat", artist: "Claude Monet", year: "1885", museum: "Clark Art Institute, Williamstown", commons: "File:Claude Monet The Cliffs at Etretat.jpg" },
    { kind: "photo", file: "sea-cliffs/unsplash-du0wAZTgkIg.jpg", unsplash: "du0wAZTgkIg", by: "Allyson Beaucourt" },
    { kind: "painting", file: "sea-cliffs/fecamp.jpg", title: "Fécamp, by the Sea", artist: "Claude Monet", year: "1881", museum: "MuMa, Le Havre", commons: "File:Monet-Fécamp-LeHavre.JPG" },
    { kind: "photo", file: "sea-cliffs/unsplash-K-KGoOvvHww.jpg", unsplash: "K-KGoOvvHww", by: "Laurent Gence" }
  ],
  mood: "White chalk against a restless sea, the light changing every minute.",
  palette: ["#f1e9d6", "#e6b98f", "#7fb0c4", "#3f6f8c", "#5c7a4a"],
  tags: { subject: ["none"], light: ["golden", "day"], weather: ["clear", "overcast", "storm"], season: ["spring", "summer", "autumn", "winter"], place: ["water", "hills"], style: ["impressionism"] },
  glance: { when: "Late afternoon to sunset, low tide", lens: "Contax 645 35mm f/3.5", exposure: "f/8, ISO 100, bracket" },
  steal: [
    "Big, simple masses: cliff, sea, sky.",
    "The cliff face takes the colour of the light: pink, gold, lilac.",
    "Broken, flickering water rendered as colour, not detail.",
    "A tiny boat or figure for scale."
  ],
  when: "Late afternoon to sunset, when low light rakes the cliff face. Low tide opens the beach and its reflections. A clearing storm gives Monet's drama.",
  where: "Sea cliffs, chalk or limestone headlands, rocky coasts, lake bluffs: any high bank over water that faces the evening sun.",
  direction: {
    pose: "Composition: the cliff on one side filling a third to half the frame; horizon high or low, never centred. Walk both the beach and the cliff top; Monet painted from both. A 1 to 2 second exposure turns the water into paint.",
    prompts: ["Wait for a gap in the clouds to light the cliff face.", "Try a 1 s exposure with the ND.", "Include one small figure or boat."]
  },
  wardrobe: [],
  props: [],
  light: {
    direction: "Side light on the cliff face from a low sun.",
    ratio: "Moderate to high: bracket toward the sun.",
    notes: "Check the tide table; some beaches are cut off at high tide. Stay back from the edge: chalk overhangs collapse."
  },
  kit: ["Contax 645 35mm f/3.5 (big sky and cliff, the Zeiss colour)", "Contax 645 140mm f/2.8 (a single arch or boat)", "Contax 645 210mm f/4 (headlands stacked up)", "Tripod", "ND filter", "Tide table"],
  settings: [
    ["Mode", "A"],
    ["Aperture", "f/8"],
    ["ISO", "100"],
    ["White balance", "Fixed 5500K"],
    ["Film simulation", "Velvia or Classic Chrome"],
    ["Bracketing", "-2 / 0 / +2"],
    ["Shutter", "1/2 to 2 s with the ND for painted water"],
    ["Release", "2 s timer"]
  ],
  post: [
    "Keep the chalk warm, never pure white.",
    "Water toward teal and violet; lift its blacks.",
    "Clarity -20, dehaze -10 on the distance.",
    "Optional: Oil Paint filter at 15% for brushed water.",
    "Crop 5:4 or 4:3, like Monet's canvases."
  ],
  breakers: ["Crowds on the beach (go early or late)", "Railings and signs on the cliff top", "Crunchy HDR clouds"],
  fallback: "Fog or rain: shoot the cliffs as a pale shape in grey, a daytime nocturne.",
  duration: "Two hours around sunset; the tide sets the schedule."
},
{
  id: "harbour-dusk",
  title: "Harbour at Dusk",
  kind: "Landscape",
  images: [
    { kind: "painting", file: "harbour-dusk/san-giorgio-dusk.jpg", title: "San Giorgio Maggiore at Dusk", artist: "Claude Monet", year: "1908 to 1912", museum: "National Museum Cardiff", wiki: ["San_Giorgio_Maggiore_at_Dusk"] },
    { kind: "photo", file: "harbour-dusk/unsplash-wZIHFOzLuTQ.jpg", unsplash: "wZIHFOzLuTQ", by: "Henrique Ferreira" },
    { kind: "painting", file: "harbour-dusk/fighting-temeraire.jpg", title: "The Fighting Temeraire", artist: "J. M. W. Turner", year: "1839", museum: "National Gallery, London", wiki: ["The_Fighting_Temeraire"] },
    { kind: "photo", file: "harbour-dusk/unsplash-Cp1xdWIjpBU.jpg", unsplash: "Cp1xdWIjpBU", by: "Alessandro Cavestro" },
    { kind: "painting", file: "harbour-dusk/grand-canal.jpg", title: "Le Grand Canal", artist: "Claude Monet", year: "1908", museum: "Fondation Beyeler, Riehen", commons: "File:Claude Monet, Le Grand Canal.jpg" }
  ],
  mood: "Buildings dissolving into the glow of water and sky.",
  palette: ["#f6c16b", "#e0735a", "#8f5f9a", "#3e4f86", "#1d2440"],
  tags: { subject: ["none"], light: ["golden", "blue"], weather: ["clear", "fog"], season: ["spring", "summer", "autumn", "winter"], place: ["water", "street"], style: ["impressionism"] },
  glance: { when: "Sunset and the 30 minutes after", lens: "Contax 645 140mm f/2.8", exposure: "f/5.6, ISO 200, -0.7 EV" },
  steal: [
    "Architecture as a silhouette, not a subject: no detail, all glow.",
    "Sky and water in the same colours, meeting at a soft horizon.",
    "A warm sun against cool violet buildings.",
    "One dark shape (a boat, a mooring post) anchors the foreground."
  ],
  when: "Sunset and the half hour after, facing the sun. Haze or light fog makes it Monet; clear air makes it Turner.",
  where: "Any waterfront with buildings across the water: harbour, canal, river quay, lakeside town, port. The Old Port and the Lachine Canal work in Montréal.",
  direction: {
    pose: "Composition: horizon low, buildings a thin dark band, sky and its reflection filling the frame. The 140 or 210 isolates one dome or tower against the sun. Add a mooring post or boat as the dark accent.",
    prompts: ["Put the sun just beside the main building, not behind it.", "Wait for a boat to cross the reflection.", "Stay after sunset: the blue arrives 15 minutes later."]
  },
  wardrobe: [],
  props: [],
  light: {
    direction: "Against the light: the sun low behind the buildings.",
    ratio: "Very high. Expose for the sky and let the buildings go dark.",
    notes: "For an Impressionist blur, try intentional camera movement: 1/4 s with a slow, steady drift. Take the sharp frame first."
  },
  kit: ["Contax 645 140mm f/2.8 (a single dome against the sun)", "Contax 645 210mm f/4 (the skyline pressed flat)", "Contax 645 35mm f/3.5 (wide water, Turner's sky)", "Tripod", "Lens hood"],
  settings: [
    ["Mode", "A"],
    ["Aperture", "f/5.6"],
    ["ISO", "100 to 400"],
    ["White balance", "Fixed 5500K to keep the orange"],
    ["Film simulation", "Velvia or Classic Neg."],
    ["Exposure", "-0.7 EV to protect the sky"],
    ["Bracketing", "-2 / 0 / +2"],
    ["Camera movement", "1/4 s, gentle horizontal or vertical drift"]
  ],
  post: [
    "Let buildings go deep violet, not black (shadows hue 260, sat 20, blacks lifted).",
    "Warm the highlights (hue 40, sat 20).",
    "Clarity -30, dehaze -15 for haze.",
    "Soft glow: a blurred copy at 15% in Screen mode.",
    "Remove cranes, antennas and neon."
  ],
  breakers: ["Sharp modern signs", "HDR halos around buildings", "A blown white sun (slight underexposure keeps its colour)"],
  fallback: "Clear, flat evening: go wide with the 35 and make it a Turner, sun and sky taking three quarters of the frame.",
  duration: "45 minutes from sunset."
},
{
  id: "water-garden",
  title: "Water Lily Garden",
  kind: "Landscape",
  images: [
    { kind: "painting", file: "water-garden/bridge-water-lilies.jpg", title: "Bridge over a Pond of Water Lilies", artist: "Claude Monet", year: "1899", museum: "The Met, New York", commons: "File:Bridge over a Pond of Water Lilies MET DT1854.jpg" },
    { kind: "photo", file: "water-garden/unsplash-DoHnXH0B420.jpg", unsplash: "DoHnXH0B420", by: "Adil Murshed" },
    { kind: "painting", file: "water-garden/water-lilies-1906.jpg", title: "Water Lilies", artist: "Claude Monet", year: "1906", museum: "Art Institute of Chicago", commons: "File:Claude Monet - Water Lilies - 1933.1157 - Art Institute of Chicago.jpg" },
    { kind: "photo", file: "water-garden/unsplash-FCfFf1K7voo.jpg", unsplash: "FCfFf1K7voo", by: "Blaz Erzetic" }
  ],
  mood: "Sky, clouds and flowers on the same surface of still water.",
  palette: ["#dfe8d2", "#9cc08a", "#4f7d5e", "#b9a4d4", "#f0b8c4"],
  tags: { subject: ["none"], light: ["day", "golden"], weather: ["overcast", "clear"], season: ["summer"], place: ["garden", "water"], style: ["impressionism"] },
  glance: { when: "Summer mornings, calm air", lens: "Contax 645 210mm f/4", exposure: "f/5.6, 1/250, ISO 200" },
  steal: [
    "No horizon: the water fills the frame and the sky appears only as reflection.",
    "Lilies as dabs of colour on green and violet.",
    "Willows and banks reflected as dark vertical shapes.",
    "A footbridge as the only built thing."
  ],
  when: "Summer mornings, when the lilies are open; most close by mid-afternoon. Calm air is essential for reflections.",
  where: "Botanical gardens, lily ponds, marsh boardwalks, park lakes. The ponds at the Montréal Botanical Garden bloom in July and August.",
  direction: {
    pose: "Composition: shoot down onto the water with the 210 from the bank until no sky or shore shows, only lilies and reflected clouds. Then step back for the bridge view with the 80: bridge across the top third, pond below.",
    prompts: ["Find a reflected cloud and put the lilies around it.", "Tilt down until the shoreline leaves the frame.", "Wait for the wind to drop."]
  },
  wardrobe: [],
  props: [],
  light: {
    direction: "Soft light from above; a bright sky for the reflections.",
    ratio: "Low.",
    notes: "A polariser removes glare, but also the reflections Monet painted. Turn it to taste, or leave it off."
  },
  kit: ["Contax 645 210mm f/4 (lilies from the bank, no horizon)", "Contax 645 140mm f/2.8 (close groups, soft background)", "GF 80mm f/1.7 (the bridge view)", "Polariser", "Tripod"],
  settings: [
    ["Mode", "A"],
    ["Aperture", "f/5.6 to f/8"],
    ["ISO", "200"],
    ["White balance", "Fixed 5500K"],
    ["Film simulation", "Astia or Velvia"],
    ["Exposure", "-0.3 EV so the reflected sky stays blue"],
    ["Focus", "On the lilies, a third of the way in"]
  ],
  post: [
    "Greens toward blue-green, luminance up; violets up in the shadows.",
    "Lift blacks to a dark violet.",
    "Clarity -30 on the water; keep a little on the nearest flowers.",
    "Optional: a very light Oil Paint filter at 20% for Monet's strokes.",
    "Try a square or panoramic crop; the late Water Lilies are wide."
  ],
  breakers: ["Visible pond edges, pipes or signs", "Coins and litter in the water", "Harsh midday glare"],
  fallback: "Wind ripples: switch to single flowers with the 140 wide open, or shoot the ripples as abstract colour at 1/4 s.",
  duration: "An hour; the lilies close by mid-afternoon."
},
{
  id: "boulevard-above",
  title: "Boulevard from Above",
  kind: "Landscape",
  images: [
    { kind: "painting", file: "boulevard-above/montmartre-spring.jpg", title: "Boulevard Montmartre, Spring", artist: "Camille Pissarro", year: "1897", museum: "Private collection", wiki: ["Boulevard_Montmartre,_Spring"] },
    { kind: "photo", file: "boulevard-above/unsplash-art3P5jf9yM.jpg", unsplash: "art3P5jf9yM", by: "Lens by Benji" },
    { kind: "painting", file: "boulevard-above/montmartre-night.jpg", title: "The Boulevard Montmartre at Night", artist: "Camille Pissarro", year: "1897", museum: "National Gallery, London", commons: "File:Camille Pissarro - Boulevard Montmartre at Night - c 1897 - National Gallery UK.jpg" },
    { kind: "photo", file: "boulevard-above/unsplash-_feTI3bCcp8.jpg", unsplash: "_feTI3bCcp8", by: "Alex varela" }
  ],
  mood: "The city as a river of movement, seen from a window high above.",
  palette: ["#e9e2d0", "#b8b3a4", "#7d8798", "#c99a6a", "#3b4252"],
  tags: { subject: ["none"], light: ["day", "blue", "night"], weather: ["overcast", "clear", "fog", "snow"], season: ["spring", "summer", "autumn", "winter"], place: ["street"], style: ["impressionism"] },
  glance: { when: "Any hour, any weather: that's the point", lens: "Contax 645 140mm f/2.8", exposure: "f/8, 1/8 s, ISO 100" },
  steal: [
    "A high viewpoint looking down a long street to a vanishing point.",
    "People and carriages as flicks of paint: movement, not detail.",
    "Trees and façades framing both sides.",
    "A series: the same view in rain, sun, night and spring."
  ],
  when: "Whenever the weather changes. Rain on the pavement at blue hour is the richest; Pissarro painted the same view 14 times.",
  where: "A window, balcony, car-park roof or footbridge above a long, straight, tree-lined street. Ask a café or hotel for an upper-floor window.",
  direction: {
    pose: "Composition: the street runs from the bottom centre to a vanishing point in the top third, with buildings framing both sides. A slow shutter (1/8 to 1/2 s) blurs traffic and walkers into strokes while the buildings stay sharp.",
    prompts: ["Wait for a bus or a crowd to cross the lower third.", "Try 1/4 s, then 1 s.", "Come back to the same spot in rain and at night."]
  },
  wardrobe: [],
  props: [],
  light: {
    direction: "Soft sky light; in rain, reflections on the road.",
    ratio: "Low by day, high at night.",
    notes: "Through glass: lens hood flat on the window, dark cloth around it."
  },
  kit: ["Contax 645 140mm f/2.8 (stacks the street into layers)", "GF 80mm f/1.7 (the whole boulevard)", "Contax 645 210mm f/4 (just the crowd)", "Tripod or window clamp", "ND filter for daytime blur", "Dark cloth for window reflections"],
  settings: [
    ["Mode", "S or M"],
    ["Shutter", "1/8 to 1/2 s"],
    ["Aperture", "f/8 to f/11"],
    ["ISO", "100"],
    ["White balance", "Fixed 5000K; at night 4000K keeps the lamps warm"],
    ["Film simulation", "Classic Neg. or Pro Neg. Std"],
    ["Release", "2 s timer, IBIS off on the tripod"]
  ],
  post: [
    "Soft, low-contrast base: blacks lifted, highlights down.",
    "Warm the wet reflections and lamps, cool the sky.",
    "Clarity -20; the motion blur does the painting.",
    "Remove or blur modern signs and logos.",
    "Crop 4:5 or 5:4, like Pissarro's canvases."
  ],
  breakers: ["Readable billboards and brand names", "Traffic lights dominating the frame", "Reflections of your own room in the glass"],
  fallback: "No high viewpoint: stand on a bridge or a stairway and shoot a crowd with the 210 at 1/15 s.",
  duration: "15 minutes per visit; a season for the series."
},
{
  id: "sunday-riverbank",
  title: "Sunday on the Riverbank",
  kind: "Portrait",
  images: [
    { kind: "painting", file: "sunday-riverbank/grande-jatte.jpg", title: "A Sunday on La Grande Jatte", artist: "Georges Seurat", year: "1884 to 1886", museum: "Art Institute of Chicago", wiki: ["A_Sunday_Afternoon_on_the_Island_of_La_Grande_Jatte"] },
    { kind: "photo", file: "sunday-riverbank/unsplash-MRAZ2fJ9hB4.jpg", unsplash: "MRAZ2fJ9hB4", by: "Szabolcs Antal" },
    { kind: "painting", file: "sunday-riverbank/bathers-asnieres.jpg", title: "Bathers at Asnières", artist: "Georges Seurat", year: "1884", museum: "National Gallery, London", wiki: ["Bathers_at_Asnières"] },
    { kind: "photo", file: "sunday-riverbank/unsplash-WDWBQ6pCRyc.jpg", unsplash: "WDWBQ6pCRyc", by: "Jim Tran" }
  ],
  mood: "Stillness in bright sun: people standing like statues in a shimmering park.",
  palette: ["#f4ecc2", "#e5a64b", "#6fa25a", "#3f7fb0", "#5a3f63"],
  tags: { subject: ["adults", "family", "kids"], light: ["day"], weather: ["clear"], season: ["summer"], place: ["water", "garden"], style: ["pointillism"] },
  plan: {
    camera: { dist: 15, label: "Far back, level with their heads" },
    subject: { facing: 9, label: "In profile and still, looking along the river" },
    lights: [{ kind: "sun", at: 10, dist: 20, label: "High sun from the side" }],
    zones: [{ at: 12, label: "River and far bank" }]
  },
  glance: { when: "Sunny afternoon, sun still high", lens: "Contax 645 210mm f/4", exposure: "f/8, 1/500, -0.3 EV" },
  steal: [
    "Figures in strict profile or seen from behind, perfectly still.",
    "Hard, bright sun with crisp shadows on the grass.",
    "A frieze: people arranged in parallel layers across the frame.",
    "Pure colours side by side: orange next to blue, red next to green."
  ],
  when: "A clear summer afternoon, roughly 2 to 5 pm, while the sun is still high enough for short, crisp shadows.",
  where: "A park lawn along a river or lake, with trees for shade and water behind. Riverbanks, quays and lakeside parks on a Sunday.",
  direction: {
    pose: "Seurat's people don't interact. Place each person in profile or seen from behind, all facing roughly the same way, and ask them to hold still. Stand far back with the 210 so the layers flatten into a frieze. Keep the camera level, not looking down.",
    prompts: [
      "Sit facing the water and don't move until I say.",
      "Stand straight, chin level, and look along the river.",
      "Hold the parasol upright, like a statue would."
    ]
  },
  wardrobe: ["Solid, saturated colours: orange, cobalt blue, red, white", "Straw boaters and bonnets", "Long skirts, dark jackets for contrast", "No patterns or logos"],
  props: ["Parasols", "A small dog", "Fishing rod", "Picnic cloth in one solid colour"],
  light: {
    direction: "High sun from the side.",
    ratio: "About 1:4: hard sun and deep, coloured shade.",
    notes: "Seurat's shade is never grey: he filled it with complementary colour. Fix the white balance and add colour to the shadows in post."
  },
  kit: ["Contax 645 210mm f/4 (flattens the frieze: the Seurat lens)", "Contax 645 140mm f/2.8 (two or three figures)", "Contax 645 35mm f/3.5 (the whole bank)", "Tripod for stillness and matching frames"],
  settings: [
    ["Mode", "A"],
    ["Aperture", "f/8 for depth through the layers"],
    ["Shutter", "1/500"],
    ["ISO", "100"],
    ["White balance", "Fixed 5500K"],
    ["Film simulation", "Velvia for pure colour, or Astia"],
    ["Tone", "Highlight -1, Shadow +1"],
    ["Exposure", "-0.3 EV"],
    ["Focus", "Single point on the main figure"]
  ],
  post: [
    "Saturate the main colours; mute everything else.",
    "Colour the shadows: blue-violet in the shade on the grass (hue 250, sat 20), orange in the light.",
    "Lift blacks hard; keep the whole frame luminous and chalky.",
    "Dot texture: duplicate the layer, Filter > Pixelate > Pointillize, cell size 6 to 10 on the full 11,648 px file, blend at 20 to 35%.",
    "Fine grain on top so the dots hold at print size.",
    "Crop wide: 3:2 or wider."
  ],
  breakers: ["People looking at the camera or at phones", "Patterned or branded clothing", "Motion: Seurat's figures never move", "Boats with logos"],
  fallback: "Overcast: this look needs sun. Switch to Luminous Waterfront, which works in haze.",
  duration: "Half an hour of patient posing."
},
{
  id: "luminous-waterfront",
  title: "Luminous Waterfront",
  kind: "Landscape",
  images: [
    { kind: "painting", file: "luminous-waterfront/gravelines-evening.jpg", title: "The Channel of Gravelines, Evening", artist: "Georges Seurat", year: "1890", museum: "MoMA, New York", commons: "File:Georges-Pierre Seurat - The Channel at Gravelines, Evening - Google Art Project.jpg" },
    { kind: "photo", file: "luminous-waterfront/unsplash-zi-Tvl6VGXY.jpg", unsplash: "zi-Tvl6VGXY", by: "Mike Barra" },
    { kind: "painting", file: "luminous-waterfront/bec-du-hoc.jpg", title: "Le Bec du Hoc, Grandcamp", artist: "Georges Seurat", year: "1885", museum: "Tate, London", commons: "File:Seurat-Le Bec du Hoc à Grandcamp.jpg" },
    { kind: "photo", file: "luminous-waterfront/unsplash-yDCMz_cR474.jpg", unsplash: "yDCMz_cR474", by: "Robert Macleod" },
    { kind: "painting", file: "luminous-waterfront/beach-at-heist.jpg", title: "The Beach at Heist", artist: "Georges Lemmen", year: "1891", museum: "Musée d'Orsay, Paris", commons: "File:Georges Lemmen - Plage à Heist.jpg" },
    { kind: "painting", file: "luminous-waterfront/bridge-in-london.jpg", title: "Bridge in London", artist: "Jan Toorop", year: "1888 to 1889", museum: "Kröller-Müller Museum, Otterlo", commons: "File:Brug in Londen, eind 1888 - begin 1889 - Jan Toorop - Olieverf op doek - Kroller-Muller - KM 101.491.jpg" }
  ],
  mood: "Water and air so still that everything glows evenly.",
  palette: ["#f2e9cf", "#e7c98f", "#a6c3cf", "#6a8fb0", "#8e7aa6"],
  tags: { subject: ["none"], light: ["golden", "day", "blue"], weather: ["clear", "fog"], season: ["spring", "summer", "autumn", "winter"], place: ["water", "street"], style: ["pointillism"] },
  glance: { when: "Calm evening or hazy morning", lens: "Contax 645 35mm f/3.5", exposure: "f/8, ISO 100, +0.3 EV" },
  steal: [
    "Emptiness: a few masts, posts or anchors in a large luminous field.",
    "A straight, calm horizon; sky and water nearly the same brightness.",
    "No deep shadows: everything glows.",
    "Seurat framed his late canvases with a painted border of dots in complementary colours."
  ],
  when: "Windless evenings after sunset and hazy mornings. Seurat painted these on the Channel coast in summer.",
  where: "Harbours, marinas, beaches at low tide, piers, canals, river bridges in haze.",
  direction: {
    pose: "Composition: very simple. Horizon on a third, one or two vertical accents (mast, post, lamp, anchor) placed with care. Leave a lot of empty sky and water.",
    prompts: ["Take out everything that isn't needed.", "Put the mast on a third and wait for the water to settle."]
  },
  wardrobe: [],
  props: [],
  light: {
    direction: "Soft, low light, the sun behind or to one side and filtered by haze.",
    ratio: "Very low.",
    notes: "Haze and still air are the whole look. Check the wind forecast: under 8 km/h."
  },
  kit: ["Contax 645 35mm f/3.5 (wide, empty, Zeiss colour)", "Contax 645 140mm f/2.8 (a single boat)", "Contax 645 210mm f/4 (a bridge in haze, as in Toorop's London)", "Tripod"],
  settings: [
    ["Mode", "A"],
    ["Aperture", "f/8"],
    ["ISO", "100"],
    ["White balance", "Fixed 5500K"],
    ["Film simulation", "Astia, or Eterna for low contrast"],
    ["Exposure", "+0.3 EV, high key"],
    ["Release", "2 s timer"]
  ],
  post: [
    "High key and flat: blacks up to about 20%, highlights down.",
    "Split tone: warm light (hue 45, sat 12), violet shadows (hue 265, sat 12).",
    "Pointillize a copy at 20 to 30% (cell size 6 to 10 on the full file), then fine grain.",
    "Optional: Seurat's painted border, a 3% frame in the complementary colour run through the same filter.",
    "Crop 5:4 or 4:3."
  ],
  breakers: ["Wind ripples breaking the calm", "Neon buoys and branded boats", "Hard midday light"],
  fallback: "Bright sun and wind: switch to Sunday on the Riverbank, which wants hard sun.",
  duration: "30 minutes around sunset."
},
{
  id: "divisionist-portrait",
  title: "Divisionist Window Portrait",
  kind: "Portrait",
  images: [
    { kind: "painting", file: "divisionist-portrait/van-gogh-self-portrait.jpg", title: "Self-Portrait", artist: "Vincent van Gogh", year: "1887", museum: "Art Institute of Chicago", commons: "File:Vincent van Gogh - Self-Portrait - 1954.326 - Art Institute of Chicago.jpg" },
    { kind: "photo", file: "divisionist-portrait/unsplash-wX3li6MT_ig.jpg", unsplash: "wX3li6MT_ig", by: "Sean Boyd" },
    { kind: "painting", file: "divisionist-portrait/luce-morning-interior.jpg", title: "Morning, Interior", artist: "Maximilien Luce", year: "1890", museum: "The Met, New York", commons: "File:Morning, Interior MET DT2164.jpg" },
    { kind: "photo", file: "divisionist-portrait/unsplash-PHSaxM3KQsU.jpg", unsplash: "PHSaxM3KQsU", by: "Helena Lopes" }
  ],
  mood: "Everyday light broken into complementary colours: warm skin, cool room.",
  palette: ["#f0c38a", "#d9803f", "#5a86c7", "#2f4f8f", "#8fb07a"],
  tags: { subject: ["adults", "kids"], light: ["day", "golden"], weather: ["clear", "overcast", "fog", "snow", "storm"], season: ["spring", "summer", "autumn", "winter"], place: ["indoors"], style: ["pointillism"] },
  plan: {
    camera: { dist: 2.5 },
    subject: { facing: 7.5, label: "Turned toward the window, eyes past the camera" },
    lights: [{ kind: "window", at: 10, dist: 1.5, label: "Window, cool daylight" }],
    mods: [{ kind: "gold", at: 4, dist: 1.2, label: "Gold reflector, warm fill" }],
    zones: [{ at: 12, label: "Plain, textured wall" }]
  },
  glance: { when: "Morning or late afternoon window light", lens: "Contax 645 140mm f/2.8", exposure: "f/2.8, 1/250, ISO 800" },
  steal: [
    "Complementary pairs everywhere: orange skin against blue, a red beard against green.",
    "A plain background brought to life by texture, not objects.",
    "A morning routine: someone caught doing something ordinary.",
    "Window light broken into warm and cool."
  ],
  when: "Morning or late afternoon, when window light comes in at an angle. Luce's scene is early morning; Van Gogh's is flat studio light.",
  where: "A bedroom, kitchen or studio with one window and a plain wall. A textured wall (plaster, wallpaper, wood) helps.",
  direction: {
    pose: "A head-and-shoulders portrait, or a half-length figure doing something ordinary: lacing boots, reading the paper, drinking coffee. Window to one side and slightly behind; a warm reflector on the shadow side supplies the complementary orange.",
    prompts: [
      "Lace your boots like you're late.",
      "Look out the window and think about the weather.",
      "(Self-portrait style) Turn your shoulders away, keep your eyes on me."
    ]
  },
  wardrobe: ["A blue jacket or shirt, the complement to skin", "Straw hat or cap", "Red or orange scarf", "Plain fabrics, no prints"],
  props: ["Coffee bowl or mug", "Newspaper", "Boots", "A plain blue or green blanket on the bed"],
  light: {
    direction: "Window slightly behind and to one side; warm reflector opposite.",
    ratio: "About 1:3. The key is cool, the fill is warm.",
    notes: "Cool daylight plus a gold reflector puts complementary colours into the face itself, which is what the dots do in paint. Turn off every lamp in the room."
  },
  kit: ["Contax 645 140mm f/2.8 (head and shoulders, painterly)", "GF 80mm f/1.7 (half-length in the room)", "Canon 135mm f/2L", "Gold reflector", "A blue or green sheet for the background"],
  settings: [
    ["Mode", "A"],
    ["Aperture", "f/2.8 to f/4"],
    ["Shutter", "1/250"],
    ["ISO", "400 to 1600"],
    ["White balance", "Fixed 5500K: the window stays cool, the reflector warm"],
    ["Film simulation", "Velvia or Classic Neg."],
    ["Metering", "Spot on the lit cheek, +0.3 EV"],
    ["Focus", "Eye AF"]
  ],
  post: [
    "Separate warm and cool: skin highlights hue 35, shadows hue 220, both sat 15 to 20.",
    "Saturate the complementary background (blue or green) behind warm skin.",
    "Pointillize a copy at 25 to 40%, cell size 8 to 14; mask it off the eyes so they stay sharp.",
    "Add grain and keep the blacks lifted.",
    "Crop 4:5 and tight, like Van Gogh's self-portraits."
  ],
  breakers: ["Mixed ceiling lights (turn them off)", "Patterned or branded clothes", "Busy walls: take things down"],
  fallback: "No good window: a single LED panel at 5600K plays the window, gold reflector opposite.",
  duration: "15 to 20 minutes."
},
{
  id: "orchard-harvest-dots",
  title: "Apple Harvest in Dots",
  kind: "Portrait",
  images: [
    { kind: "painting", file: "orchard-harvest-dots/pissarro-apple-harvest.jpg", title: "Apple Harvest", artist: "Camille Pissarro", year: "1888", museum: "Dallas Museum of Art", commons: "File:Camille Pissarro - Apple Harvest - 1955.17.M - Dallas Museum of Art.jpg" },
    { kind: "photo", file: "orchard-harvest-dots/unsplash-y-N7B95Ciro.jpg", unsplash: "y-N7B95Ciro", by: "Janylah Etienne" },
    { kind: "photo", file: "orchard-harvest-dots/unsplash-higEHR1vThE.jpg", unsplash: "higEHR1vThE", by: "Daria Kulakova" }
  ],
  mood: "People at work under fruit trees, the whole scene glittering with sun.",
  palette: ["#f2d78c", "#e0894a", "#b8433a", "#7aa35a", "#6f84b8"],
  tags: { subject: ["adults", "family", "kids"], light: ["day", "golden"], weather: ["clear"], season: ["autumn"], place: ["farm", "garden"], style: ["pointillism"] },
  plan: {
    camera: { dist: 7, label: "Through the branches" },
    subject: { facing: 9, label: "Working, reaching up, face half hidden" },
    lights: [{ kind: "sun", at: 1.5, dist: 20, label: "Sun through the branches" }],
    zones: [{ at: 12, label: "Rows of sunlit trees" }]
  },
  glance: { when: "Sunny afternoon in apple season", lens: "Contax 645 140mm f/2.8", exposure: "f/5.6, 1/500, 0 EV" },
  steal: [
    "Sunlight broken by leaves into warm spots scattered over the ground and the figures.",
    "Figures bent to the work, faces mostly hidden.",
    "Shadows on the grass are violet and blue.",
    "Red apples as the accent against green."
  ],
  when: "September and early October afternoons, with the sun coming from the side through the trees.",
  where: "Pick-your-own orchards, old farm orchards, community gardens with fruit trees.",
  direction: {
    pose: "Let them pick. Stand back with the 140 and frame through the branches so leaves and apples blur in the foreground. Two or three figures at different depths: one reaching, one bending, one carrying.",
    prompts: ["Fill the basket from the low branches first.", "Pass the apples down to the basket.", "Shake the branch gently and collect what falls."]
  },
  wardrobe: ["Headscarves and straw hats", "Aprons in blue or white", "Skirts and shirts in solid, muted colours", "No logos"],
  props: ["Wicker baskets", "Wooden ladder", "Long pole with a hook", "Cloth spread on the grass"],
  light: {
    direction: "Side sun filtered by the canopy.",
    ratio: "About 1:3, patchy.",
    notes: "Expose for the sunlit leaves and let the shade go blue; the dots in post will open it up."
  },
  kit: ["Contax 645 140mm f/2.8 (foreground blur through the branches)", "Contax 645 35mm f/3.5 (the whole row)", "Contax 645 210mm f/4 (figures from far away)"],
  settings: [
    ["Mode", "A"],
    ["Aperture", "f/4 to f/5.6"],
    ["Shutter", "1/500"],
    ["ISO", "Auto"],
    ["White balance", "Fixed 5500K"],
    ["Film simulation", "Velvia or Astia"],
    ["Exposure", "0 to -0.3 EV"],
    ["Focus", "AF-C, zone"]
  ],
  post: [
    "Greens toward yellow-green in the light and blue-green in the shade.",
    "Violet shadows on the grass (hue 260, sat 18).",
    "Pointillize a copy at 20 to 35%, cell size 6 to 10, then grain on top.",
    "Lift blacks: the scene should shimmer, not punch.",
    "Crop 5:4 with the figures low in the frame."
  ],
  breakers: ["Plastic buckets and crates", "Price signs and parked cars", "Bright rubber boots"],
  fallback: "Overcast: the sparkle disappears. Use the same wardrobe for the Harvest Genre Scene card instead.",
  duration: "An hour; picking keeps everyone busy."
}
];
