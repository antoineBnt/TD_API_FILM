import { motion, useTransform } from "framer-motion";
import SmallCard from "./SmallCard";

function AnimateCard({ item, index, baseY }) {
  const baseMovement = -70;
  const additionalOffset = index * 30;
  const y = useTransform(baseY, (value) => value + additionalOffset);

  return (
    <motion.div style={{ y }} key={item.show.id}>
      <SmallCard
        name={item.show.name}
        genres={item.show.genres}
        runtime={item.show.runtime}
        rating={item.show.rating.average}
        summary={item.show.summary}
        image={item.show.image ? item.show.image.medium : null}
      />
    </motion.div>
  );
}

export default AnimateCard;
