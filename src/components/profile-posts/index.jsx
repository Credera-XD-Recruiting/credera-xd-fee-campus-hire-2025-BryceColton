import './style.css';
import { getProfileData } from '../../services/profile';
import { useQuery } from '@tanstack/react-query';

export const ProfilePosts = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfileData,
  });

  if (isLoading) {
    return (
      <section id="profile-posts">
        <h2 className="page-heading-2">Pinned Posts</h2>
        <div className="profile-post-results">
          <div className="content-card fade-in">
            <div className="post-author">
              <div className="post-author-avatar loading"></div>
              <div className="post-author-info">
                <div className="skeleton-block skeleton-block--half loading"></div>
                <div className="skeleton-block skeleton-block--quarter loading"></div>
              </div>
            </div>
            <div className="post-content skeleton-block loading"></div>
          </div>
        </div>
      </section>
    );
  }

  const { pinnedPost } = data;

  const publishedDate = new Date(pinnedPost.publishDate);
  const isValidDate = !isNaN(publishedDate);
  const formattedDate = isValidDate
    ? publishedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : pinnedPost.publishDate;
  const formattedTime = isValidDate
    ? publishedDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    : '';

  return (
    <section id="profile-posts">
      <h2 className="page-heading-2">Pinned Posts</h2>
      <div className="profile-post-results">
        <div className="content-card post-card">
          <div className="post-author fade-in">
            <div className="post-author-avatar fade-in"></div>
            <div className="post-author-info fade-in">
              <p className="page-paragraph">
                {pinnedPost.authorFirstName} {pinnedPost.authorLastName}
              </p>
              <p className="page-micro">
                {pinnedPost.jobTitle} @ {pinnedPost.companyName}
              </p>
            </div>
          </div>
          <p className="page-body post-content fade-in">{pinnedPost.post}</p>
          <div className="post-meta">
            <span className="post-meta-date">
              {formattedDate}{formattedTime && `: ${formattedTime}`}
            </span>
            <span className="post-meta-separator">•</span>
            <span className="post-meta-location">
              {pinnedPost.city}, {pinnedPost.state}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
