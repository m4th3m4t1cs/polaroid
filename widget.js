// Real home-screen widget via the free "Scriptable" app (App Store).
// 1. Install Scriptable, tap +, paste this, name it "Polaroid".
// 2. Home screen → long-press → + → Scriptable → add a widget (small or large).
// 3. Long-press the widget → Edit Widget → Script: Polaroid.
//    When interacting: Open URL → your site's address (tap the widget to open the site).

const ME = "me"; // on your friend's phone, change this to "friend"
const PHOTO = `https://YOUR-PROJECT.supabase.co/storage/v1/object/public/photos/to-${ME}.jpg`;

const w = new ListWidget();
w.backgroundColor = new Color("#fbf9f5");
w.setPadding(10, 10, 26, 10); // thick polaroid bottom edge
w.refreshAfterDate = new Date(Date.now() + 15 * 60 * 1000);

try {
  const img = await new Request(`${PHOTO}?t=${Date.now()}`).loadImage();
  const pic = w.addImage(img);
  pic.centerAlignImage();
  pic.applyFillingContentMode();
} catch (e) {
  const t = w.addText("no photo yet");
  t.textColor = Color.gray();
  t.centerAlignText();
}

Script.setWidget(w);
Script.complete();
