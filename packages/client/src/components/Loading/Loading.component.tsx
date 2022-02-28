import "./Loading.css";
import Logo from "../../assets/img/logo_blue.png";

export interface LoadingProps {

}

export function Loading() {
  return (
    <section className="wrap">
      <header className="loading__header">
        <img className="loading_img" src={Logo} alt="naister logo"/>
        <h1 className="loading__title">Naister platform</h1>
      </header>
      <main>
        <div className="loader">Loading...</div>
      </main>
    </section>
  );
}
