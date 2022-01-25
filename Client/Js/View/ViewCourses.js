import Data from "../data.js";

export default class ViewCourses{

    constructor(home){
       this.home = home;
       this.home.returnHome();
    }

    eventHandler = e => {
        let obj = e.target;
        if(obj.id == "goBack"){
            this.home.pageBuilder('Enrolment&#x2122;');
        }else if(obj.id == 'course1'){
            this.clickedCard(obj);
        }else if(obj.id == 'goBack2'){
            this.home.pageBuilder('Courses');
            this.coursesMain();
        }else if(obj.className == "newCourse"){
            this.addCourse();
        }
    }


    coursesMain = () => {
        let main = document.querySelector('main');
        main.innerHTML = '';
        main.innerHTML = `<div class="fcnBtn">
                                <div id="goBack" class="navBtn">
                                    <h2 id="goBack">Return to Main</h2>
                                </div>
                            </div>
                            <div class="container-courses">
                                <div class="cards-container">
                                    
                                    <div class="newCourse">
                                        <h2>+ New Course</h2>
                                    </div>
                                </div>
                            </div>`;        
        main.addEventListener('click',this.eventHandler);                
        this.populateCourses();
    }

    courseDetailsMain = () => {
        this.home.returnHome();
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
                            <div id="courseBox" class="course-box">
                                
                            </div>`;
        main.addEventListener('click',this.eventHandler);
    }

    //+++ API Functions

    getCourses = async () => {
        try {
            const data = new Data();
            const courses = await data.getCourses();
            return courses;
        } catch (error) {
            console.warn(error);
        }
    }

    //--- Courses 

    populateCourses = async () => {
        try {
            const courses = await this.getCourses();
            courses.forEach(e => {
                this.createCourseCard(e);
            });
        } catch (error) {
            console.warn(error);
        }
    }

    createCourseCard = (obj) => {
        let card = `
                        <span id="course1">${obj.department}</span>
                        <h2 id="course1">${obj.course_name}</h2></br>
                        <span id="course1">Course Id: ${obj.course_id}</span>
                    `;
        let div = document.createElement('div');
        div.id = 'course1';
        div.className = 'card';
        div.innerHTML = card;
        let cardContainer = document.querySelector('.cards-container');
        cardContainer.insertBefore(div,cardContainer.children[0]);
    }

    clickedCard = (obj) => {
        
        if(obj.tagName == 'DIV'){
            let title = obj.children[0].textContent;
            let name = obj.children[1].textContent;
            let id = obj.children[3].textContent;
            this.populateCourseDetails(title,name,id);
        }else{
            obj = obj.parentElement;
            let title = obj.children[0].textContent;
            let name = obj.children[1].textContent;
            let id = obj.children[3].textContent;
            this.populateCourseDetails(title,name,id);
        }
    }

    //--- Course Details

    populateCourseDetails = async (title,name,id) => {
        try {
            const courses = await this.getCourses();
            courses.forEach( e=>{
                if(title == e.department && name == e.course_name){
                    this.home.pageBuilder('Course Details');
                    this.courseDetailsMain();
                    this.createCourseDetailCard(e);
                }
            });
        } catch (error) {
            console.warn(error);
        }
    }

    createCourseDetailCard = (obj) => {
        let card = `<img src="https://picsum.photos/id/1073/300/200" alt="info picture">
        <h4>${obj.course_name}</h4>
        <p>${obj.department}</p>
        <p>Course ID: ${obj.course_id}</p>`;
        let cBox = document.getElementById('courseBox');
        cBox.innerHTML = card;
    }

    //--- Add Course

    addCourse = () => {
        let addSection = document.querySelector('.container-courses');
        addSection.innerHTML = `<div class="addSectionStyle">
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
                                        <button id="addStBtn">Add Student</button>
                                        <button id="cancel">Cancel</button>
                                    </div>
                                </div>`;
    }
}