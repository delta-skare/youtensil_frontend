<ListGroupItem key={tip.id} className="tip-container main">

  {/* ---------image container ---------- */}
  <div className="image-container">
    <img className="image" src={tip.image}/>
  </div>

  {/* --------- info container ---------- */}
  <div className="info-container">
    <div className="top-info">
      <p style={{border:"solid pink 1px", marginTop:"13px"}}>{username}</p>
      { userId === tip.user_id ? edit : <FollowButton followUserId={tip.user_id} followText={"Tip Author"} /> }
    </div>

    <div className="middle-info">
      <h4>{tip.restaurant}</h4>
      <p>{tip.food_types}</p>
    </div>

    <div className="bottom-info">
      <p>{tip.description}</p>
    </div>

  </div>
</ListGroupItem>
