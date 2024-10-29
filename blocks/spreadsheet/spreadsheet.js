async function fetchItems (block,path,itemsPerPage,currentPage) {
    try {
    const offset=(currentPage-1)*itemsPerPage;
    let spreadseetPath=path+"?offset="+offset+"&limit="+itemsPerPage;
    const response = await fetch(spreadseetPath); // Replace with your JSON URL
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    renderData(block,path,itemsPerPage,currentPage,data);
} 
    catch (error) {
        return [];
    }
}

function renderData(block,path,itemsPerPage,currentPage,data)  
{  
    const table = document.createElement('table');
    const items=data.data;
    const totalItems=data.total;
    table.setAttribute('data-totalItems',totalItems);

    const tableHead=document.createElement('tr');
    const headers=['ID','Name','Email'];
    headers.forEach(headerText=>{
        const th=document.createElement('th');
        th.contentText=headerText;
        tableHead.append(th);
    });
    table.append(tableHead);

    // Render the list items
    items.forEach(item => {

        const tableRow = document.createElement('tr');

        const idColumn=document.createElement('td');
        idColumn.textContent = item.ID; // ID Column
        tableRow.appendChild(idColumn);

        const FirstName=document.createElement('td');
        FirstName.textContent = item.FirstName; // FirstName Column
        tableRow.appendChild(FirstName);

        const LastName=document.createElement('td');
        LastName.textContent = item.LastName; // LastName Column
        tableRow.appendChild(LastName);

        const emailColumn=document.createElement('td');
        emailColumn.textContent = item.Email; // Email Column
        tableRow.appendChild(emailColumn);
        table.append(tableRow);
    });
    block.querySelector('div').style.display = 'none'; ;
    const clearTable=block.querySelector('table');
    if(clearTable)
    {
        block.querySelector('table').remove();
    }
    block.prepend(table);
}
function renderPagination(block,path,itemsPerPage,totalItems,currentPage)
{
    const totalPages=Math.ceil(totalItems/itemsPerPage);
    const pagination=document.createElement('ul');
    pagination.innerHTML='';
    for(let i=1;i<=totalPages;i++)
    {
        const li=document.createElement('li');
        li.textContent=i;
        //li.classList.add(i===currentPage ? 'active' : '');
        li.addEventListener('click',() =>{
            currentPage=i;
            paginate(block,path,itemsPerPage,totalItems,currentPage);
        });
        pagination.appendChild(li);
    }
    block.append(pagination);
}
async function paginate(block,path,itemsPerPage,totalItems,currentPage)
{
    fetchItems(block,path,itemsPerPage,currentPage);
}
export default async function decorate(block) {
        let currentPage=1;
        const itemsPerPage=20;
        const link = block.querySelector('a');
        const path = link ? link.getAttribute('href') : block.textContent.trim();
        const items=await fetchItems(block,path,itemsPerPage,currentPage);
        const totalItems=block.querySelector('table').getAttribute('data-totalItems');
        renderPagination(block,path,itemsPerPage,totalItems,currentPage);
}
