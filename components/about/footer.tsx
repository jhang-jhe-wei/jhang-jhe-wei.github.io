import SocialMediaList from '../social_media_list/social_media_list'
export default function Footer (): React.ReactElement {
  return (
    <footer className="bg-primary dark:bg-light py-9">
      <p className="hidden text-center text-primary dark:text-light">
        張哲瑋 Wells / mail:  <a href="mailto:hi@wells.tw">hi@wells.tw</a>
      </p>
      <div className="px-10 md:justify-between md:flex">
        <p className="mb-6 text-xl text-center md:mb-0 text-light dark:text-primary text-nobile">hi@wells.tw</p>
        <SocialMediaList styleName="justify-center" mode="dark"/>
      </div>
    </footer>
  )
}
