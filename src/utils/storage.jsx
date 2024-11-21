export const saveStudentId = (userid)=>{
    localStorage.setItem("student_id" , userid)
}

export const removeStudentId = ()=>{
    localStorage.removeItem("student_id")
}
