function skillsMember() {
    var skills = document.getElementById("skills");
    var member = document.getElementById("member");
    var memberSkills = document.getElementById("memberSkills");

    if (member.checked == true) {
        skills.style.display = "none";
        memberSkills.style.display = "block";
    } else {
        skills.style.display = "block";
        memberSkills.style.display = "none";
    }
}