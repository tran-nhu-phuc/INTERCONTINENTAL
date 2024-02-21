import "./menu-logo-header.css";
interface Props {
  isStatusHeader: any;
}
const MenuLogoHeader: React.FC<Props> = (props: Props) => {
  return (
    <>
      <div className="menu-logo-header">
        <img
          src={
            props.isStatusHeader
              ? "/asset/image-header-home/image-header-home-1.svg"
              : "https://th.bing.com/th/id/R.dac6ac7b9b93ade37f386b44c27fa8e0?rik=7fkA4FhB0QWV8g&pid=ImgRaw&r=0"
          }
          alt="menu-logo"
        />
      </div>
    </>
  );
};
export default MenuLogoHeader;
