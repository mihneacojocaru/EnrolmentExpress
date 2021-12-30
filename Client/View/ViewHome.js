export default class ViewHome{
    constructor () {
        this.root = document.getElementById('root');
        this.pageBuilder('Enrolment&#x2122;');
        this.homePage();
    }

    pageBuilder = (item) => {
        this.root.innerHTML = '';
        this.root.innerHTML += this.nav(item);
        this.root.innerHTML += this.main();
    }

    nav = (item) => {
        return `<nav>
                    <h1 class="homeLink">${item}</h1>
                    <div class="elements">
                        <span>Sign Up</span>
                        <span>Sign In</span>
                    </div>
                </nav>`;
    }

    main = () => {
        return `<main></main>`;
    }

    homePage = () => {
        let main = document.querySelector('main');
        main.innerHTML = '';
        main.innerHTML = `<div class="container">
                                                        <div id='courses' class="card--">
                                                            <h2 id='courses'>Courses</h2>
                                                        </div>
                                                        <div id='students' class="card--">
                                                            <h2 id='students'>Students</h2>
                                                        </div>
                                                    </div>`;

        main.addEventListener('click',(e)=>{
            e.preventDefault();
            let obj = e.target;
            if(obj.id == 'courses'){
                this.courses();
            }else if(obj.id == 'students'){
                console.log('students');
            }
        })
    }

    courses = () => {
        let main = document.querySelector('main');
        main.innerHTML = '';
        main.innerHTML = `  <span id='goBack'>Go Back...</span>
                            <div class="cards-container">
                                <div class="card">
                                    <span>Course</span>
                                    <h2>Build a Basic Bookcase</h2>
                                </div>
                                <div class="card">
                                    <span>Course</span>
                                    <h2>Learn How to Program</h2>
                                </div>
                                <div class="card">
                                    <span>Course</span>
                                    <h2>Learn How to Test Programs</h2>
                                </div>
                                <div class="newCourse">
                                    <h2>+ New Course</h2>
                                </div>
                            </div>`;
        let goBack = document.getElementById('goBack');
        goBack.addEventListener('click',this.homePage);
    }
}