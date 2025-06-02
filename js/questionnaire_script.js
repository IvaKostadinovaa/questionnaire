
    document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-btn');
    const sections = document.querySelectorAll('.tab-section');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalScore = document.getElementById('modalScore');
    const progressBar = document.getElementById('progressBar');
    const adviceBtn = document.getElementById('adviceBtn');
    const adviceText = document.getElementById('adviceText');
    const closeModalBtn = document.getElementById('closeModal');

    const adviceMessages = {
    mental: "Твоето ментално здравје е твоја најголема сила – не заборавај да се грижиш за себе.",
    physical: "Секоја мала физичка активност ти носи голема радост и позитивна енергија – почни со малку, но секој ден.",
    social: "Биди добар кон другите и слушај ги со внимание. Малата љубезност може да направи голема разлика и да ги зближи луѓето."
};

    tabs.forEach(tab => {
    tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const targetId = tab.getAttribute('data-target');
    sections.forEach(sec => {
    sec.style.display = (sec.id === targetId) ? 'block' : 'none';
});

    adviceText.style.display = 'none';
    modalOverlay.style.display = 'none';
});
});


    function calculateScore(sectionId) {
    const section = document.getElementById(sectionId);
    const selects = section.querySelectorAll('select');
    let totalScore = 0;
    let maxScore = 0;

    for (const select of selects) {
    if (!select.value) return null;
    totalScore += parseInt(select.value, 10);
    maxScore += select.querySelectorAll('option').length - 1;
}

    return Math.round((totalScore / maxScore) * 100);
}


    function showModal(sectionId, score) {
    modalScore.textContent = `Твојот резултат е: ${score}%`;
    progressBar.style.width = `${score}%`;
    adviceText.style.display = 'none';
    adviceText.textContent = adviceMessages[sectionId] || '';
    modalOverlay.style.display = 'flex';

    adviceBtn.onclick = () => {
    adviceText.style.display = 'block';
};
}

    closeModalBtn.addEventListener('click', () => {
    modalOverlay.style.display = 'none';
    adviceText.style.display = 'none';
});


    document.querySelectorAll('.submit-section-btn').forEach(button => {
    button.addEventListener('click', e => {
    e.preventDefault();
    const section = button.closest('section');
    const sectionId = section.id;


    const selects = section.querySelectorAll('select');
    for (const select of selects) {
    if (!select.value) {
    alert('Ве молиме пополнете ги сите полиња во оваа секција.');
    return;
}
}


    const score = calculateScore(sectionId);
    if (score !== null) {
    showModal(sectionId, score);
}
});
});
});
