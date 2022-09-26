const GroupAvatar = (props) => {
  let name = props.name;
  let link = props.link;
  return (
    <div className="avatar groupAvatar">
      <button className="rounded mask mask-squircle">
        <img className="block" src={link} alt="group avatar" />
        <p>{name}</p>
      </button>
    </div>
  );
};

export default GroupAvatar;
