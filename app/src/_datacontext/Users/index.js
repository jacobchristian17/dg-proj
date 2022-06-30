import { useState, useEffect } from "react";
import useAxiosPrivate from "../../_hooks/useAxiosPrivate";

function Users() {
    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/users', {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setUsers(response.data);
            } catch (err) {
                console.error(err);
            }
        }
        getUsers();
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])
    return (
        <div>
            <h2>Users list</h2>
            {users?.length
                ? (
                    <ul>
                        {users.map((obj, i) => <li key={i}>{obj?.user}</li>)}
                    </ul>
                ) : (
                    <p>No users to display</p>
                )
            }
            <br />
        </div>
    )
}

export default Users