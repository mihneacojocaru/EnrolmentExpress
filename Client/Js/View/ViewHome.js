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

    eventHandler = (e) => {
            e.preventDefault();
            let obj = e.target;
            if(obj.id == 'courses'){
                this.pageBuilder('Courses');
                this.courses();
            }else if(obj.id == 'students'){
                this.pageBuilder('Students');
                this.students();
            }else if(obj.id == 'addStudent'){
                this.addStudent();
            }else if(obj.id == 'course1'){
                this.pageBuilder('Course Details');
                this.courseDetails();
            }else if(obj.id == 'enrolments'){
                this.pageBuilder('Enrolments');
                this.enrolments();
            }else if(obj.id == 'goBack'){
                this.pageBuilder('Enrolment&#x2122;');
                this.homePage();
            }else if(obj.id == 'goBack2'){
                this.pageBuilder('Courses');
                this.courses();
            }else if(obj.id == 'cancel'){
                this.pageBuilder('Students');
                this.students();
            }else if(obj.id == 'addEnrolment'){
                this.addEnrolment();
            }else if(obj.id == 'cancel2'){
                this.pageBuilder('Enrolments');
                this.enrolments();
            }
    }
 
    nav = (item) => {
        return `<nav>
                    <h1 class="homeLink">${item}</h1>
                    <div class="elements">
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
        main.addEventListener('click',this.eventHandler);
        // let btn = document.getElementById('students');
        // btn.click();
    }

    courses = () => {
        let main = document.querySelector('main');
        main.innerHTML = '';
        main.innerHTML = `<div class="fcnBtn">
                                <div id="goBack" class="navBtn">
                                    <h2 id="goBack">Return to Main</h2>
                                </div>
                            </div>
                            <div class="container-courses">
                                <div class="cards-container">
                                    <div id="course1" class="card">
                                        <span id="course1">Course</span>
                                        <h2 id="course1">Build a Basic Bookcase</h2>
                                    </div>
                                    <div id="course1" class="card">
                                        <span id="course1">Course</span>
                                        <h2 id="course1">Learn How to Program</h2>
                                    </div>
                                    <div id="course1" class="card">
                                        <span id="course1">Course</span>
                                        <h2 id="course1">Learn How to Test Programs</h2>
                                    </div>
                                    <div class="newCourse">
                                        <h2>+ New Course</h2>
                                    </div>
                                </div>
                            </div>`;
        main.addEventListener('click',this.eventHandler);
        // let btn = document.getElementById('course1');
        // btn.click();
    }

    courseDetails = () => {
        let main = document.querySelector('main');
        main.innerHTML = '';
        main.innerHTML = `<div class="fcnBtn">
                                <div class="navBtn">
                                    <h2>Update Course</h2>
                                </div>
                                <div class="navBtn">
                                    <h2>Delete Course</h2>
                                </div>
                                <div id="goBack2" class="navBtn">
                                    <h2 id="goBack2">Return to List</h2>
                                </div>
                            </div>
                            <div class="course-box">
                                <img src="https://picsum.photos/id/1073/300/200" alt="info picture">
                                <h4>Military Logistics</h4>
                                <p>Engineering</p>
                                <p>Course ID: MICTW</p>
                            </div>`;
        main.addEventListener('click',this.eventHandler);
    }

    students = () => {
        let main = document.querySelector('main');
        main.innerHTML = '';
        main.innerHTML = `
                            <div class="fcnBtn">
                                <div id="addStudent" class="navBtn">
                                    <h2 id="addStudent">Add Student</h2>
                                </div>
                                <div id="enrolments" class="navBtn">
                                    <h2 id="enrolments">Enrolments</h2>
                                </div>
                                <div id="goBack" class="navBtn">
                                    <h2 id="goBack">Return to Main</h2>
                                </div>
                            </div>
                            <div class="addSection"></div>
                            <div class="generic-table">
                                <h2>Student List</h2>
                                <table>
                                    <thead>
                                        <th>Id</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Date of Birth</th>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Alois</td>
                                            <td>Veldens</td>
                                            <td>02/22/2001</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>Alois</td>
                                            <td>Veldens</td>
                                            <td>02/22/2001</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>`;
        main.addEventListener('click', this.eventHandler);
        // let btn = document.getElementById('addStudent');
        // btn.click();
    }

    enrolments = () => {
        let main = document.querySelector('main');
        main.innerHTML = '';
        main.innerHTML = `
                            <div class="fcnBtn">
                                <div id="addEnrolment" class="navBtn">
                                    <h2 id="addEnrolment">Add Enrolment</h2>
                                </div>
                                <div id="students" class="navBtn">
                                    <h2 id="students">Return to Students</h2>
                                </div>
                            </div>
                            <div class="addSection"></div>
                            <div class="generic-table">
                                <h2>Course Enrolments</h2>
                                <table>
                                    <thead>
                                        <th>Student Id</th>
                                        <th>Course Id</th>
                                        <th>Created at</th>
                                        <th>Option</th>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>MICTW</td>
                                            <td>2021-11-09 18:07:02</td>
                                            <td>
                                                <button>Update</button>
                                                <button>Delete</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>CLNSE</td>
                                            <td>2021-01-16 05:58:50</td>
                                            <td>
                                                <button>Update</button>
                                                <button>Delete</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                                `;
        main.addEventListener('click', this.eventHandler);
    }

    addStudent = () => {
        let addSection = document.querySelector('.addSection');
        addSection.innerHTML = `
                                <h2>Add new student</h2>
                                <form action="#">
                                    <label for="fName">Frist Name</label>
                                    <input type="text" name="fName">
                                    <label for="lName">Last Name</label>
                                    <input type="text" name="lName">
                                    <label for="dOB">Date of Birth</label>
                                    <input type="text" name="dOB">
                                </form>
                                <div class="buttons">
                                    <button id="addStudent">Add Student</button>
                                    <button id="cancel">Cancel</button>
                                </div>`;
        addSection.addEventListener('click',this.eventHandler);
    }

    addEnrolment = () => {
        let addSection = document.querySelector('.addSection');
        addSection.innerHTML = `
                                <h2>Enrol new student</h2>
                                <form action="#">
                                    <label for="studentId">Student Id</label>
                                    <input type="text" name="studentId">
                                    <label for="courseId">Course Id</label>
                                    <input type="text" name="courseId">
                                </form>
                                <div class="buttons">
                                    <button id="addEnrolment">Submit Enrolment</button>
                                    <button id="cancel2">Cancel</button>
                                </div>`;
        addSection.addEventListener('click',this.eventHandler);
    }

}