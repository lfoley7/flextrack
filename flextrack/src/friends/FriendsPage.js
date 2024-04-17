import { useNavigate } from "react-router-dom";
import './FriendsPage.css';

function FriendsPage() {
    const navigate = useNavigate();
    const friends = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' },
        // Add more friends here
    ];

    const selectFriend = (friendId) => {
        // Placeholder functionality for selecting a friend
        console.log(`Friend ${friendId} selected`);
        navigate('/challenge-create'); // Redirect to challenge creation page
    };

    return (
        <div className="friends-layout">
            <header className="friends-header">
                <h1>Select a Friend to Challenge</h1>
            </header>
            <div className="friends-list">
                {friends.map((friend) => (
                    <div key={friend.id} className="friend-item" onClick={() => selectFriend(friend.id)}>
                        <div className="friend-name">{friend.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FriendsPage;
