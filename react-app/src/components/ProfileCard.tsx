import { useState } from "react";


interface Props {
  name: string;
  img_url: string;
}

function ProfileCard({ name, img_url }: Props) {

    const [dimensions, setDimensions] = useState({ height: 0, width: 0 });

    const handleImageLoad = (e: any) => {
        const { naturalHeight, naturalWidth } = e.target;
        setDimensions({ height: naturalHeight, width: naturalWidth });
    };

  return (
    <>
      <h1>{name}</h1>
      <img
        className="avatar"
        src={img_url}
        alt={"Photo of " + name}
        onLoad={handleImageLoad}
        style={{
          width: dimensions.width,
          height: dimensions.height,
        }}
      />
    </>
  );
}

export default ProfileCard;
