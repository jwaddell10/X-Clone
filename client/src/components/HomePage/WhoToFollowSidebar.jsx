import useFetchUsers from "../../helpers/useFetchUsers";
import "../../Styles/WhoToFollowSidebar.css"

export default function WhoToFollowSidebar() {
    //query users, display users with button
    const { users, isLoading, error } = useFetchUsers("user")
    return (   
        <div>
            {users && users.map((user) => (
                <ul key={user.id} className="user-sidebar">
                    {/* <img src={user.Profile.profilePicture} alt="" /> */}
                    <li className="user-name" style={{color: 'white'}}>
                        {user.name}
                    </li>
                </ul>
            ))}
        </div>
    )
}