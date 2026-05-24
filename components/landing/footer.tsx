import SocialMediaList from '../social_media_list/social_media_list'
export default function Footer (): React.ReactElement {
  return (
    <div className="flex w-full">
      <svg height="40" width="100%">
        <line x1="0" y1="20" x2="100%" y2="20" strokeWidth="3" className="stroke-primary dark:stroke-white" />
      </svg>
      <SocialMediaList/>
      <svg height="40" width="100%">
        <line x1="0" y1="20" x2="100%" y2="20" strokeWidth="3" className="stroke-primary dark:stroke-white stroke-2" />
      </svg>
    </div>
  )
}
