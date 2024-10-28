export default async function decorate(block) {
    const userList = block.querySelector('#user-list');

    try {
        const response = await fetch('https://develop--eds-tr--aadiahlawat.aem.page/eds-spreadsheet.json'); // Replace with your JSON URL
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('This is spreadsheet data: '+data);
        // Render the list users
       /* data.forEach(user => {
            const li = document.createElement('li');
            li.textContent = user.name; // Adjust according to your JSON structure
            userList.appendChild(li);
        });*/
    } catch (error) {
        console.error('Fetch error:', error);
    }
}
