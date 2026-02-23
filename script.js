let interviewList = [];
let rejectedList = [];
let currentStatus = 'all'

let total = document.getElementById('total');
let interviewCount = document.getElementById('interview-count');
let rejectedCount = document.getElementById('rejected-count');

const allCardCount = document.getElementById('all-card');
const mainContainer = document.querySelector('main');
const filterSection = document.getElementById('filtered-section')

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');


function calculateCount() {
    total.innerText = allCardCount.children.length
    interviewCount.innerText = interviewList.length
    rejectedCount.innerText = rejectedList.length
}

calculateCount();

function toggleStyle(id) {
    allFilterBtn.classList.remove('btn-info', 'text-white');
    interviewFilterBtn.classList.remove('btn-info', 'text-white');
    rejectedFilterBtn.classList.remove('btn-info', 'text-white');

    const selected = document.getElementById(id);
    currentStatus = id

    selected.classList.add('btn-info', 'text-white');

    if (id == 'interview-filter-btn') {
        allCardCount.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderInterview();
    }
    else if (id == 'all-filter-btn') {
        allCardCount.classList.remove('hidden');
        filterSection.classList.add('hidden');
    }
    else if (id == 'rejected-filter-btn') {
        allCardCount.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderRejected();
    }
}

mainContainer.addEventListener('click', (event) => {

    if (event.target.classList.contains('interview-btn')) {
        const parenNode = event.target.parentNode.parentNode;
        const cardHeading = parenNode.querySelector('.cardHeading').innerText;
        const jobDesig = parenNode.querySelector('.jobDesig').innerText;
        const jobType = parenNode.querySelector('.jobType').innerText;
        const cardStatus = parenNode.querySelector('.cardStatus').innerText;
        const notes = parenNode.querySelector('.notes').innerText;
        parenNode.querySelector('.cardStatus').innerText = 'Interview';

        const cardinfo = {
            cardHeading,
            jobDesig,
            jobType,
            cardStatus: 'Interview',
            notes
        }

        const cardExist = interviewList.find(item => item.cardHeading == cardinfo.cardHeading)

        if (!cardExist) {
            interviewList.push(cardinfo);
        }

        rejectedList = rejectedList.filter(item => item.cardHeading != cardinfo.cardHeading);

        if (currentStatus == 'rejected-filter-btn') {
            renderRejected()
        }

        calculateCount();
    }

    else if (event.target.classList.contains('rejected-btn')) {
        const parenNode = event.target.parentNode.parentNode;
        const cardHeading = parenNode.querySelector('.cardHeading').innerText;
        const jobDesig = parenNode.querySelector('.jobDesig').innerText;
        const jobType = parenNode.querySelector('.jobType').innerText;
        const cardStatus = parenNode.querySelector('.cardStatus').innerText;
        const notes = parenNode.querySelector('.notes').innerText;
        parenNode.querySelector('.cardStatus').innerText = 'Rejected';

        const cardinfo = {
            cardHeading,
            jobDesig,
            jobType,
            cardStatus: 'Rejected',
            notes
        }

        const cardExist = rejectedList.find(item => item.cardHeading == cardinfo.cardHeading);


        if (!cardExist) {
            rejectedList.push(cardinfo);
        }
        interviewList = interviewList.filter(item => item.cardHeading != cardinfo.cardHeading);

        if (currentStatus == 'interview-filter-btn') {
            renderInterview();
        }

        calculateCount();
    }
    else if (event.target.classList.contains('btn-delete')) {
        let deleteBtn = event.target.classList.contains('btn-delete');

        if (event.target.classList.contains('btn-delete')) {
            deleteBtn = event.target;
        } else {
            deleteBtn = event.target.parentNode
        }

        let card = deleteBtn.parentNode.parentNode;
        let cardHeading = card.querySelector('.cardHeading').innerText;

        interviewList = interviewList.filter(item => item.cardHeading != cardHeading);
        rejectedList = rejectedList.filter(item => item.cardHeading != cardHeading);

        card.remove();
        calculateCount();
    }

})

function renderInterview() {
    filterSection.innerHTML = '';

    for (let interview of interviewList) {


        let div = document.createElement('div');
        div.className = 'job-card flex justify-between border p-4 rounded-2xl'
        div.innerHTML = `
        
        <div class="space-y-5">
            <!-- part 1 -->
                <div>
                    <p class="cardHeading text-[18px] font-bold">${interview.cardHeading}</p>
                    <p class="jobDesig text-gray-500">${interview.jobDesig}</p>
                </div>

                <div>
                    <p class="jobType text-gray-500">${interview.jobType}</p>
                </div>

                <p class="cardStatus border border-blue-300 bg-blue-100 max-w-[100px] text-center text-blue-700 font-semibold">${interview.cardStatus}</p>
                <p class="notes text-gray-500 text-[14px]">${interview.notes}</p>

                <div class="flex gap-5">
                    <button class="interview-btn btn btn-success btn-outline ">Interview</button>
                    <button class="rejected-btn btn btn-error btn-outline">Rejected</button>
                </div>
        </div>

            <!-- main part 2 -->
        <div>
            <button class="btn-delete btn"><i class="fa-solid fa-trash-can"></i></button>
        </div>

        `
        filterSection.appendChild(div);
    }
}


function renderRejected() {
    filterSection.innerHTML = '';

    for (let rejected of rejectedList) {

        let div = document.createElement('div');
        div.className = 'job-card flex justify-between border p-4 rounded-2xl'
        div.innerHTML = `
        
        <div class="space-y-5">
            <!-- part 1 -->
                <div>
                    <p class="cardHeading text-[18px] font-bold">${rejected.cardHeading}</p>
                    <p class="jobDesig text-gray-500">${rejected.jobDesig}</p>
                </div>

                <div>
                    <p class="jobType text-gray-500">${rejected.jobType}</p>
                </div>

                <p class="cardStatus border border-blue-300 bg-blue-100 max-w-[100px] text-center text-blue-700 font-semibold">${rejected.cardStatus}</p>
                <p class="notes text-gray-500 text-[14px]">${rejected.notes}</p>

                <div class="flex gap-5">
                    <button class="interview-btn btn btn-success btn-outline ">Interview</button>
                    <button class="rejected-btn btn btn-error btn-outline">Rejected</button>
                </div>
        </div>

            <!-- main part 2 -->
        <div>
            <button class="btn-delete btn"><i class="fa-solid fa-trash-can"></i></button>
        </div>

        `
        filterSection.appendChild(div);
    }
}