import ViewCourses from "./ViewCourses.js";
import ViewStudents from "./ViewStudents.js";
import ViewEnrolments from "./ViewEnrolments.js";

export default class ViewHome{

    constructor () {
        this.root = document.getElementById('root');
        this.pageBuilder('Enrolment&#x2122;');
        this.object = {}; 
        this.returnHome();
    }

    eventHandler = (e) => {
        e.preventDefault();
        let obj = e.target;

        if(obj.id == 'courses'){
            this.pageBuilder('Courses');
            const viewCourses = new ViewCourses(this);
            viewCourses.coursesMain();
        }else if(obj.id == 'students'){
            this.pageBuilder('Students');
            const viewStudents = new ViewStudents(this);
            viewStudents.studentsMain();
        }else if(obj.id == 'cancel3'){
            this.pageBuilder('Enrolment&#x2122;');
        }
    }

    pageBuilder = (item) => {
        this.root.innerHTML = '';
        this.root.innerHTML += this.nav(item);
        this.returnHome();
        this.root.innerHTML += this.main();
        this.homePage();
    }

    nav = (item) => {
        return `<nav>
                    <h1 id="toMain" class="homeLink">${item}</h1>
                    <div class="elements">
                        <span id="signIn">Sign In</span>
                    </div>
                </nav>`;
    }

    navFunctions = (e) => {
        let obj = e.target;
        if(obj.id == 'toMain'){
            this.pageBuilder('Enrolment&#x2122;');
            this.homePage();
            console.log('navClick')
        }else if(obj.id == 'signIn'){
            this.pageBuilder('Enrolment&#x2122;');
            this.signIn();
        }

    }

    returnHome = () =>{
        let navBtn = document.querySelector('nav');
        navBtn.addEventListener('click',this.navFunctions);
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
        main.addEventListener('click',this.eventHandler);
        // let btn = document.getElementById('students');
        // btn.click();
    }


    signIn = () => {
        let content = `
        <div class="signIn">
            <div class="addSectionStyle">
                <h2>Sign In</h2>
                <form action="#">
                    <label for="fName">Username</label>
                    <input type="text" name="fName">
                    <label for="lName">Password</label>
                    <input type="password" name="lName">
                </form>
                <div class="buttons">
                    <button id="cancel3">Sign In</button>
                    <button id="cancel3">Cancel</button>
                </div>
            </div>
        </div>
        `;
        let main = document.querySelector('main');
        main.innerHTML = '';
        main.innerHTML = content;
        main.addEventListener('click',this.eventHandler);
        this.returnHome();
    }
}