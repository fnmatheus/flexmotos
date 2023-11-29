import { IProps } from '../../utils/interfaces';

const Securities: React.FC<IProps> = ({token}: IProps) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Cauções</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="flex gap-2">
              <p>Nome do cliente</p>
              <p>R$ 9999999,99</p>
              <button>Devolver</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Securities;
