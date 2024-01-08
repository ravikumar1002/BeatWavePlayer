import { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";

export const wrapperReactRouter = ({ children }: { children: ReactNode }): React.JSX.Element => (
    <MemoryRouter>{children}</MemoryRouter>
  );