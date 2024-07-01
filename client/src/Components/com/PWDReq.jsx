


const PWDRequisite = ({
    capsLetterFlag,
    numberFlag,
    pwdLengthFlag,
    specialCharFlag,
  }) => {
    return (
      <div className="message">
        <p className={capsLetterFlag}>Must contain 1 Capital Letter <span className="span"> </span></p>
        <p className={numberFlag}>Must contain on number</p>
        <p className={pwdLengthFlag}>length should be more than 6 Characters</p>
        <p className={specialCharFlag}> Must contain one special character</p>
      </div>
    );
  };
  
  export default PWDRequisite;