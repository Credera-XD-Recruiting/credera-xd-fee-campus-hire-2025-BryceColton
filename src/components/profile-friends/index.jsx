import './style.css';
import { getFriendsListData } from '../../services/profile';
import { useQuery } from '@tanstack/react-query';

export const ProfileFriends = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['friends'],
    queryFn: getFriendsListData,
  });

  if (isLoading)
    return (
      <section id="profile-friends">
        <div className="content-card fade-in">
          <h2 className="page-heading-2">Friends</h2>
          <ul className="profile-friends-list">
            <li className="profile-list-item">
              <div className="profile-list-item-avatar loading"></div>
              <div className="profile-list-item-info">
                <div className="skeleton-block skeleton-block--half loading"></div>
                <div className="skeleton-block--quarter loading"></div>
              </div>
            </li>
            <li className="profile-list-item">
              <div className="profile-list-item-avatar loading"></div>
              <div className="profile-list-item-info">
                <div className="skeleton-block skeleton-block--half loading"></div>
                <div className="skeleton-block--quarter loading"></div>
              </div>
            </li>
            <li className="profile-list-item">
              <div className="profile-list-item-avatar loading"></div>
              <div className="profile-list-item-info">
                <div className="skeleton-block skeleton-block--half loading"></div>
                <div className="skeleton-block--quarter loading"></div>
              </div>
            </li>
            <li className="profile-list-item">
              <div className="profile-list-item-avatar loading"></div>
              <div className="profile-list-item-info">
                <div className="skeleton-block skeleton-block--half loading"></div>
                <div className="skeleton-block--quarter loading"></div>
              </div>
            </li>
          </ul>
        </div>
      </section>
    );

  const { friends } = data;

  const getLast = (lastname) => lastname.trim().split(" ").pop().toLowerCase();

  const getInitials = (name) => name.charAt(0).toUpperCase() + getLast(name).charAt(0).toUpperCase();

  const topFriends = friends.filter(f => f.topFriend); 
  const otherFriends = friends
    .filter(f => !f.topFriend)
    .sort((a, b) => {
      const lastnameA = getLast(a.name);
      const lastnameB = getLast(b.name);
      // first compare last names, if they are the same compare full names
      if (lastnameA !== lastnameB) return lastnameA.localeCompare(lastnameB);
      return a.name.localeCompare(b.name);
    });

  const sortedFriends = [...topFriends, ...otherFriends];

  return (
    <section id="profile-friends">
      <div className="content-card fade-in">
        <h2 className="page-heading-2">Friends</h2>
        <ul className="profile-friends-list">
          {sortedFriends.map(friend => (
            <li
              className={`profile-list-item fade-in ${friend.topFriend ? 'is-top-friend' : ''}`}
              key={friend.id}
            >
              <div className="profile-list-item-avatar">
                {friend.image ? (
                  <img
                    className="loading"
                    src={friend.image}
                    alt={getInitials(friend.name)}
                  />
                ) : (
                  <span className="avatar-initials">{getInitials(friend.name)}</span>
                )}
              </div>
              <div className="profile-list-item-info">
                <p className="page-paragraph">{friend.name}</p>
                <p className="page-micro">
                  {friend.jobTitle} @ {friend.companyName}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
