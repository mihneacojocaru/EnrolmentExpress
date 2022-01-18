import fs from "fs";

export default class EnrolmentRepository {
  getEnrolment = () => {
    return new Promise((resolve, reject) => {
      fs.readFile("./Data/enrolment.json", "utf-8", (err, data) => {
        if (err) {
          reject(err);
        } else {
          const d = JSON.parse(data);
          resolve(d);
        }
      });
    });
  };

  saveNewEnrolment = (data) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(
        "./Data/enrolment.json",
        JSON.stringify(data, null, 2),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve("Succeded");
          }
        }
      );
    });
  };

  newEnrolmentsList = async (obj) => {
    try {
      let enrolment = await this.getEnrolment();
      obj.created_at = this.timeStamp();
      enrolment.push(obj);
      await this.saveNewEnrolment(enrolment);
    } catch (error) {
      console.warn(error);
    }
  };

  timeStamp(){
    let date = new Date();
    
    let info = date.toISOString();
    
    let x = info.split('T');
    let d = x[0];
    let t = x[1].split('.');

    return d + ' ' + t[0];
  }

  deleteEnrolment = async (studentId, courseId) => {
    try {
      let enrolments = await this.getEnrolment();
      enrolments = enrolments.filter(
        (e) => e.student_id !== studentId && e.course_id !== courseId
      );
      await this.saveNewEnrolment(enrolments);
    } catch (error) {
      console.warn(error);
    }
  };

  updateEnrolmentsList = async (item,studentId,courseId) => {
    try {
      let enrolments = await this.getEnrolment();

      for (let i = 0; i < enrolments.length; i++) {
        if(enrolments[i].student_id == studentId){
          if(enrolments[i].course_id == courseId){
            enrolments[i].student_id = item.student_id;
            enrolments[i].course_id = item.course_id;
            enrolments[i].created_at = this.timeStamp();
          }
        }
      }
      
      await this.saveNewEnrolment(enrolments);
    } catch (error) {
      console.warn(error);
    }
  };
}
