import fs from 'fs';

export default class CoursesRepository{

    getCourses = () => {
        return new Promise((resolve, reject) => {
          fs.readFile("./Data/courses.json", "utf-8", (err, data) => {
            if (err) {
              reject(err);
            } else {
              const d = JSON.parse(data);
              resolve(d);
            }
          });
        });
      };

      saveNewCourse = (data) => {
        return new Promise((resolve, reject) => {
          fs.writeFile("./Data/courses.json", JSON.stringify(data, null, 2), (err) => {
            if (err) {
              reject(err);
            } else {
              resolve("Succeded");
            }
          });
        });
      };

      deleteCourse = async (courseId) => {
  
        try {
          let courses = await getCourses();
          courses = courses.filter( e => e.course_id !== courseId);
      
          console.log(courses);
          //await saveNewCourse(courses);
      
        } catch (error) {
          console.warn(error);
        }
      
      }
}