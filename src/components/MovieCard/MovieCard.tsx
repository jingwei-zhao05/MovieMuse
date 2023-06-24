// import { Link } from "react-router-dom";

interface MovieCardProps {
  id: number;
  title: string;
  imgSrc: string;
  releaseDate: string;
  handleClick: (event: React.MouseEvent) => void;
  className: string;
}

export default function MovieCard({
  id,
  title,
  imgSrc,
  releaseDate,
  handleClick,
  className,
}: MovieCardProps) {
  return (
    <div className={className} onClick={handleClick} id={String(id)}>
      <img className="movie-card__img" src={imgSrc} alt={title} />
      <div className="movie-card__description">
        <h3 className="movie-card__title">{title}</h3>
        <p className="movie-card__date">{releaseDate}</p>
      </div>
    </div>
  );
}
