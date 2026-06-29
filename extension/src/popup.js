// PUBLIK popup. Stores the selected property id; the content script reacts to
// the storage change and fills the portal form.
const input = document.getElementById("pid");
const msg = document.getElementById("msg");

chrome.storage.local.get("publikPropertyId").then(({ publikPropertyId }) => {
  if (publikPropertyId) input.value = publikPropertyId;
});

document.getElementById("save").addEventListener("click", async () => {
  const id = input.value.trim();
  if (!id) return;
  await chrome.storage.local.set({ publikPropertyId: id });
  msg.hidden = false;
});
