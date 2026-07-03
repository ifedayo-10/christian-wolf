import React from "react";
import { Still } from "remotion";
import { PAGE_WIDTH, PAGE_HEIGHT } from "./pageSize";
import { ACover, AForeword, ATOC, AVonChris, AKapitel1, ARecipe } from "./directions/a";
import { BCover, BForeword, BTOC, BVonChris, BKapitel1, BRecipe } from "./directions/b";
import { CCover, CForeword, CTOC, CVonChris, CKapitel1, CRecipe } from "./directions/c";

const stills: { id: string; component: React.FC }[] = [
  { id: "a-cover", component: ACover },
  { id: "a-toc", component: ATOC },
  { id: "a-foreword", component: AForeword },
  { id: "a-von-chris", component: AVonChris },
  { id: "a-kapitel1", component: AKapitel1 },
  { id: "a-recipe", component: ARecipe },
  { id: "b-cover", component: BCover },
  { id: "b-toc", component: BTOC },
  { id: "b-foreword", component: BForeword },
  { id: "b-von-chris", component: BVonChris },
  { id: "b-kapitel1", component: BKapitel1 },
  { id: "b-recipe", component: BRecipe },
  { id: "c-cover", component: CCover },
  { id: "c-toc", component: CTOC },
  { id: "c-foreword", component: CForeword },
  { id: "c-von-chris", component: CVonChris },
  { id: "c-kapitel1", component: CKapitel1 },
  { id: "c-recipe", component: CRecipe },
];

export const RemotionRoot: React.FC = () => (
  <>
    {stills.map(({ id, component }) => (
      <Still key={id} id={id} component={component} width={PAGE_WIDTH} height={PAGE_HEIGHT} />
    ))}
  </>
);
