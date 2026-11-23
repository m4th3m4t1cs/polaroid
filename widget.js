// Real home-screen widget via the free "Scriptable" app (App Store).
// 1. Install Scriptable, tap +, paste this, name it "Polaroid".
// 2. Fill in ME and TOKEN below (the token stays on your phone, never in the repo).
// 3. Home screen → long-press → + → Scriptable → add a widget (small or large).
// 4. Long-press the widget → Edit Widget → Script: Polaroid.
//    When interacting: Open URL → https://m4th3m4t1cs.github.io/polaroid/?me=me (or ?me=friend)

const ME = "me";                 // on your friend's phone: "friend"
const TOKEN = "PASTE-TOKEN-HERE";
const URL_ = `https://api.github.com/repos/m4th3m4t1cs/polaroid/contents/to-${ME}.jpg?ref=photos`;

const w = new ListWidget();
w.backgroundColor = new Color("#fbf9f5");
w.setPadding(10, 10, 26, 10); // thick polaroid bottom edge
w.refreshAfterDate = new Date(Date.now() + 15 * 60 * 1000);

try {
  const req = new Request(URL_);
  req.headers = { Authorization: `Bearer ${TOKEN}`, Accept: "application/vnd.github.raw" };
  const pic = w.addImage(await req.loadImage());
  pic.centerAlignImage();
  pic.applyFillingContentMode();
} catch (e) {
  const t = w.addText("no photo yet");
  t.textColor = Color.gray();
  t.centerAlignText();
}

Script.setWidget(w);
Script.complete();
