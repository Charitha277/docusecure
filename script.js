const docs = [];

const folderMap = {
  "doc1.pdf": "Personal",
  "report.docx": "Work",
  "image.png": "Shared"
};

function uploadFile() {
  const input = document.getElementById("fileInput");
  const file = input.files[0];
  if (file) {
    const folder = Object.keys(folderMap).includes(file.name)
      ? folderMap[file.name]
      : "Personal";

    docs.push({ name: file.name, folder });
    displayDocs(docs);
  }
}

function displayDocs(filtered) {
  const container = document.getElementById("docGrid");
  container.innerHTML = "";

  filtered.forEach((doc) => {
    const div = document.createElement("div");
    div.className =
      "p-4 bg-white text-black rounded-xl shadow-md hover:scale-105 transition-all";

    div.innerHTML = `
      <div class="text-xl">📄</div>
      <div class="mt-2 font-semibold">${doc.name}</div>
      <div class="text-sm text-gray-500">${doc.folder}</div>
    `;
    container.appendChild(div);
  });
}

function filterFolder(folder) {
  document.querySelectorAll(".tab-btn").forEach((btn) => btn.classList.remove("active-tab"));
  event.target.classList.add("active-tab");

  if (folder === "All") {
    displayDocs(docs);
  } else {
    const filtered = docs.filter((d) => d.folder === folder);
    displayDocs(filtered);
  }
}

function searchDocs() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filtered = docs.filter((d) => d.name.toLowerCase().includes(query));
  displayDocs(filtered);
}
