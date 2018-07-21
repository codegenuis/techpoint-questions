/**
 * This is the entry point to the program
 *
 * @param {array} input Array of student objects
 */
function classifier(input) {
  // Your code should go here.
  let noOfGroups = 0;
  let output ={}
  
  input.map((student)=>{
    const {name, dob, regNo} = student
    const age = new Date().getFullYear() - new Date(dob).getFullYear();
  
    // if no of groups is zero
    if(!noOfGroups){
    createNewGroup({name, age, regNo})
    return
    }

    let  inserted = false

    for(let groupNumber = 1; groupNumber <= noOfGroups; groupNumber++){

        let group = `group${groupNumber}`
        let members = output[group].members
        let oldest =  output[group].oldest
        let sum = output[group].sum

        if(members.length < 3){
            let eligible = false
            members.map((member)=>{
                if(age <= member.age+5 && age >= member.age-5 )
                    eligible = true;
                
            })

            if(eligible){
                output = {
                    ...output,
                  noOfGroups: noOfGroups,
                    [group]: {
                        members: [
                            ...output[group].members,
                            {name, age}
                        ],
                        oldest:(age > oldest?age:oldest ),
                        sum: sum+age,
                        regNo:[...output[group].regNo, ...regNo]

                    }
                }
                inserted= true
            }              
        }
    }

        
    if(!inserted)
        createNewGroup({name, age, regNo})
        
})

function createNewGroup(firstMember){
  const {name, age, regNo} = firstMember
    noOfGroups = noOfGroups+1
    let group = `group${noOfGroups}`
    output = {
        ...output,
        [group]: {
            members: [
                {name, age}
            ],
            oldest: age,
            sum: age,
            regNo:[regNo],
        }
    }
}

console.log(JSON.stringify(output))
}

module.exports = classifier;
