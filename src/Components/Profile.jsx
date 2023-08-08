import React, { useEffect, useRef, useState } from "react";
import Modal from 'react-modal';
import { useNavigate } from "react-router-dom";

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  
const Profile = () => {
    let[user,setUser] =useState(null);
    let name =useRef();
    let email = useRef();
    let phone = useRef();
    let old_password = useRef();
    let new_password = useRef();
    let conform_password = useRef();
 let redirect = useNavigate();

    let out = useNavigate();
    let comeOut =(e)=>{
         e.preventDefault();
         localStorage.removeItem("currentuser"); //remove token after logging out
          out("/login");
          alert("logout successfully!!")
    }
   
    let handleUpdateProfile = (e)=>{
        e.preventDefault();

      let updatedata = {
        name : name.current.value,
        email: email.current.value,
        phone_number: phone.current.value,
        password: user.password
      }

      fetch(`http://localhost:5000/user/${user.id}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(updatedata)
      })
      .then(()=>{
        localStorage.setItem("currentuser", JSON.stringify(updatedata))
        setUser(updatedata);
        alert("successfully updated your profile")
        setTimeout(()=>{
            closeModal()
        },1000)
      })

    }

    let handleResetPassword = (e)=>{
          e.preventDefault();
          if(old_password.current.value !== user.password)
          {
            alert('Old Password is incorrect'); 
          }
          else
          {
            if(new_password.current.value != conform_password.current.value)
            {
                alert('New password does not match with confirm new password.')
            }
            else
            {
                let resetpassword = {
                    id : user.id,
                    name: user.name,
                    email : user.email,
                    phone_number : user.phone,
                    password : new_password.current.value
                }

                fetch(`http://localhost:5000/user/${user.id}`,{
                    method:"PUT",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify(resetpassword)
                  })
                  .then(()=>{
                    alert("reset your password successfully!!")
                    localStorage.removeItem("currentuser")
                    redirect("/login")
                  })
            }
          }
         
    }

    useEffect(()=>{
          let result = JSON.parse(localStorage.getItem("currentuser"))
          setUser(result)
          // console.log(result);
    },[])

    
    // ______________________________ 1st model ____________________________ 

    
        let subtitle;
        const [modalIsOpen, setIsOpen] = useState(false);
      
        function openModal() {
          setIsOpen(true);
        }
      
        function afterOpenModal() {
          // references are now sync'd and can be accessed.
          subtitle.style.color = '#f00';
          name.current.value = user.name
          // console.log(user.name);
          email.current.value=  user.email
          phone.current.value = user.phone_number
        }
      
        function closeModal() {
          setIsOpen(false);
        }


// _________________2nd model____________________________________________________


        let subtitle1;
        const [modalIsOpen1, setIsOpen1] = useState(false);
    
        function openModal1() {
        setIsOpen1(true);
        }
    
        function afterOpenModal1() {
        // references are now sync'd and can be accessed.
        subtitle1.style.color = '#f00';
        }
    
        function closeModal1() {
        setIsOpen1(false);
        }
    return ( 
        <>
            { user   &&    <div className="profile">
                                <article>
                                    <img src="https://assets.cars24.com/production/c2b-website/230801153219/js/d8e03eca1c5e5bcf4363a9191a0a406b.webp"  id="cover" />
                                    <img src="https://www.desparkauto.edu.my/wp-content/uploads/2015/09/Automobile-Engineer-2.jpg" id="profilePic" />
                                </article>
                                <h1>Name : {user.name}</h1>
                                <h1>Email ID : {user.email}</h1>
                                <h1>Phone : {user.phone_number}</h1>
                                <div className="btns">
                                    <button onClick={comeOut} >Logout</button>
                                    <button onClick={openModal}>Update Profile</button>
                                    <button onClick={openModal1}>Reset Password</button>
                                </div>

                            </div>
            }

                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Update profile</h2>

                    <form className="update-profile" onSubmit={handleUpdateProfile}>
                        <input type="text" placeholder="Name" ref={name}/>
                        <input type="email" placeholder="email" ref={email}/>
                        <input type="tel" max="10" min="10" placeholder="phone" ref={phone} />
                        <input type="submit" value="update profile" />
                    </form>
                    
                </Modal>

            <Modal
                isOpen={modalIsOpen1}
                onAfterOpen={afterOpenModal1}
                onRequestClose={closeModal1}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 ref={(_subtitle) => (subtitle1 = _subtitle)}>Reset password</h2>

                <form className="update-password" onSubmit={handleResetPassword}>
                    <input type="text" placeholder="Old password"  ref={old_password}/>
                    <input type="password" placeholder="New password"  ref={new_password}/>
                    <input type="text" placeholder="Confirm password" ref={conform_password}/>
                    <input type="submit" value="Reset password" />
                </form>
                
            </Modal>
        </>
    );
}
 
export default Profile;