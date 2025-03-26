let parentPath
fetch('/api/pathfinder', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    // body: JSON.stringify({ name: 'John', age: 30 })
    
}).then(res => res.json())
    .then(data => {
        document.getElementById('listFF').innerHTML = '';
        console.log(data.data)
        for ( let folder of data.data.folder){
            crateFolder(folder)
        }
        parentPath = data.data.folder[0].parentPath
        document.getElementById('path').innerHTML = parentPath ? `${parentPath}` : '';
    })
    .catch(err => console.log(err));

async function crateFolder(folder) {
    let listFF = document.getElementById('listFF');
    let newFolder = document.createElement('div');
    newFolder.className = "bg-blue-100 p-4 rounded-lg flex items-center space-x-3 shadow-lg hover:bg-blue-500";
    newFolder.onclick = () => {
        console.log(`Folder clicked: ${folder.parentPath}`);
        getFolder(folder.name)
    };
    newFolder.innerHTML = `
                <span class="text-blue-600 text-2xl">📁</span>
                <span class="text-gray-700 font-medium">${folder.name}</span>

    `;
    listFF.appendChild(newFolder);
}
async function cratePDF(file) {
    let listFF = document.getElementById('listFF');
    let newFolder = document.createElement('div');
    newFolder.className = "bg-blue-100 p-4 rounded-lg flex items-center space-x-3 shadow-lg hover:bg-blue-500";
    newFolder.onclick = () => {
        console.log(`Folder clicked: ${file.parentPath}`);
        openPDF(`${file.parentPath}/${file.name}`)
    };
    newFolder.innerHTML = `
                 <span class="text-gray-600 text-2xl">📄</span>
                <span class="text-gray-700 font-medium">${file.name}</span>

    `;
    listFF.appendChild(newFolder);
}

async function openPDF(params) {
    document.getElementById('listFF').innerHTML = '';
    let frame = document.getElementById('pdfFrame');
    let newIframe = document.createElement('iframe');
    newIframe.className = "w-full h-dvh border rounded-lg"
    newIframe.src = `dir${params}#toolbar=0`
    frame.appendChild(newIframe)
    
}


async function getFolder(namePath) {
    console.log(namePath)
    try {
        const response = await fetch('/api/pathfinder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ path: `${parentPath}/${namePath}` })
        });

        const data = await response.json();
        parentPath = `${parentPath}/${namePath}`
        document.getElementById('path').innerHTML = parentPath ;
        document.getElementById('listFF').innerHTML = '';
        console.log(data.data)
        for (let folder of data.data.folder) {
            crateFolder(folder)
        }
        for (let file of data.data.pdf) {

            cratePDF(file)
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
async function back() {
    if (!parentPath){
        return
    }
    if (parentPath === '/Volumes/CASEMIX/@CASEMIX 2024/FILE FINAL/2025'){
        return
    }
    document.getElementById('pdfFrame').innerHTML = '';
    const lastIndex = parentPath.lastIndexOf('/');
    parentPath = parentPath.substring(0, lastIndex);
    console.log(parentPath)
    const response = await fetch('/api/pathfinder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ path: `${parentPath}` })
    });
 
    
    

    const data = await response.json();
    console.log(data);
    document.getElementById('listFF').innerHTML = '';
    console.log(data.data)
    for (let folder of data.data.folder) {
        crateFolder(folder)
    }
    for (let file of data.data.pdf) {
        cratePDF(file)
    }
    
}