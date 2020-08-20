const finalScore=document.getElementById('finalScore');
const mostRecentScore=localStorage.getItem('mostRecentScore');
const maxScore=localStorage.getItem('mostRecentMaxScore');
finalScore.innerText=mostRecentScore+'/'+maxScore;