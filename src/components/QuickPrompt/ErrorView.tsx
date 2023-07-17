export default function ErrorView({error, isErrorVisible}: any) {
    return (
      isErrorVisible && error ?
      <div className={`response__info`}>
          <div className="response__info__text model">Model : Van Gough</div>
          <div className="response__info__text error__name">{error.name}</div>
        </div>
      : null
    )
  } 