import className from 'classnames';
import { ButtonProps } from '../types/OtherTypes';

const Button = ({
  children,
  primary,
  heart,
  danger,
  circle,
  big,
  mid,
  selected,
  ...rest
}: ButtonProps) => {
  const classes = className(rest.className, 'button', {
    'button-primary': primary,
    'button-heart': heart,
    'button-danger': danger,
    'button-circle': circle,
    'button-mid': mid,
    'button-big': big,
    selected: selected,
  });

  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  );
};

export default Button;
