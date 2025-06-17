import API from '../api';

const classService = {
  getAll:                ()               => API.get('/classes'),
  getInstructorClasses:  ()               => API.get('/classes/instructor'),
  create:                classData        => API.post('/classes', classData),
  delete:                classId          => API.delete(`/classes/${classId}`),
  
};

export default classService;
