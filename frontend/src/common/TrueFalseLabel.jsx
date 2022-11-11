export default function TrueFalseLabel(props){
    let image;
    if(props.isTrue){
        image = "https://emojipedia-us.s3.amazonaws.com/source/skype/289/check-mark_2714-fe0f.png"
    }
    else{
        image = "https://emojipedia-us.s3.amazonaws.com/source/skype/289/cross-mark_274c.png"
    }
    return(
        <img style={{'height':props.height}}src={image}/>
    )
}