export default async function decorate(block) {
    
    const ul = document.createElement('ul');
    try {
        const response = await fetch('https://develop--eds-tr--aadiahlawat.aem.page/eds-spreadsheet.json'); // Replace with your JSON URL
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('This is spreadsheet data: '+data);
        // Render the list users
        data.data.forEach(user => {
            const li = document.createElement('li');
            li.textContent = user.name; // Adjust according to your JSON structure
            ul.appendChild(li);
        });
        block.textContent = '';
        block.append(ul);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}
