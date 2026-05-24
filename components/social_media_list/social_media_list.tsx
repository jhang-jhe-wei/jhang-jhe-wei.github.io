import GithubLogo from './github_logo'
import FacebookLogo from './facebook_logo'
import InstagramLogo from './instgram_logo'
import LinkdinLogo from './linkdin_logo'
import MailLogo from './mail_logo'
export default function SocialMediaList ({ mode, styleName }: { mode?: string, styleName?: string }): React.ReactElement {
  return (
    <ul className={`flex items-center ${styleName ?? ''}`}>
      <li className="mx-2">
        <a href="https://github.com/jhang-jhe-wei" target="__blank">
          <GithubLogo mode={ mode }/>
        </a>
      </li>
      <li className="mx-2">
        <a href="https://www.facebook.com/profile.php?id=100006651004776" target="__blank">
          <FacebookLogo mode={ mode }/>
        </a>
      </li>
      <li className="mx-2">
        <a href="https://www.instagram.com/wells_0523/" target="__blank">
          <InstagramLogo mode={ mode }/>
        </a>
      </li>
      <li className="mx-2">
        <a href="https://www.linkedin.com/in/%E5%93%B2%E7%91%8B-%E5%BC%B5-b89496205/" target="__blank">
          <LinkdinLogo mode={ mode }/>
        </a>
      </li>
      <li className="mx-2">
        <a href="mailto:hi@wells.tw">
          <MailLogo mode={ mode }/>
        </a>
      </li>
    </ul>
  )
}
