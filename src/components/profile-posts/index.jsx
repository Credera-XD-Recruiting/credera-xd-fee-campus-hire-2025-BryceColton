import './style.css';
import { getProfileData } from '../../services/profile';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

export const ProfilePosts = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfileData,
  });

  const [cardExpanded, setCardExpanded] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(false);

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


  const Meta = (
    <div className="post-meta">
      <span className="post-meta-date">
        {formattedDate}{formattedTime && `: ${formattedTime}`}
      </span>
      <span className="post-meta-separator">•</span>
      <span className="post-meta-location">
        {pinnedPost.city}, {pinnedPost.state}
      </span>
    </div>
  );

  return (
    <section id="profile-posts">
      <h2 className="page-heading-2">Pinned Posts</h2>
      <div className="profile-post-results">
        <div className="content-card post-card post-card--desktop">
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

          <div
            className={`post-collapsible ${cardExpanded ? 'is-expanded' : ''}`}
            aria-expanded={cardExpanded}
          >
            <p className="page-body post-content">{pinnedPost.post}</p>
            {!cardExpanded && <div className="fade-out-overlay" />}
          </div>

          <button
            type="button"
            className="post-toggle-btn"
            onClick={() => setCardExpanded(v => !v)}
            aria-label={cardExpanded ? 'Collapse post' : 'Expand post'}
          >
            {cardExpanded ? 'Show less' : 'Read more'}
          </button>

            {Meta}
        </div>

        <div className="post-accordion post-accordion--mobile">
          <button
            type="button"
            className="post-accordion-trigger"
            onClick={() => setAccordionOpen(o => !o)}
            aria-expanded={accordionOpen}
            aria-controls="pinned-post-panel"
            id="pinned-post-trigger"
          >
            <span className="post-accordion-author">
              {pinnedPost.authorFirstName} {pinnedPost.authorLastName}
            </span>
            <span className="post-accordion-inline-meta">
              {formattedDate}{formattedTime && `: ${formattedTime}`} • {pinnedPost.city}, {pinnedPost.state}
            </span>
            <span className="chevron" aria-hidden="true" />
          </button>
          <div
            id="pinned-post-panel"
            role="region"
            className={`post-accordion-panel ${accordionOpen ? 'is-open' : ''}`}
          >
            <div className="post-accordion-body">
              <p className="page-body">{pinnedPost.post}</p>
              <div className="post-accordion-meta-wrapper">
                {Meta}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
