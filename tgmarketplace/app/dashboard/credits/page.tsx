import React from "react";

const page = () => {
  return (
    <div>
      <div className="hero bg-base-200 h-[30rem] w-[50rem] rounded-lg flex mx-auto justify-center mt-10 border-red-500 border-2">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">
              Utang Binabayaran. Hindi kinakalimutan !!!
            </h1>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body">
              <div className="overflow-x-auto">
                <table className="table table-xs table-pin-rows table-pin-cols">
                  <thead>
                    <tr>
                      <th></th>
                      <td>Product Name</td>
                      <td>Quantity</td>
                      <td>Price</td>
                      <td>Total:</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>1</th>
                      <td>Lemon Square</td>
                      <td>3</td>
                      <td>10</td>
                      <td>30</td>
                    </tr>
                    <tr>
                      <th>2</th>
                      <td>Piyaya</td>
                      <td>2</td>
                      <td>80</td>
                      <td>160</td>
                    </tr>
                    <tr>
                      <th>3</th>
                      <td>Piyaya</td>
                      <td>2</td>
                      <td>80</td>
                      <td>160</td>
                    </tr>
                    <tr>
                      <th>4</th>
                      <td>Piyaya</td>
                      <td>2</td>
                      <td>80</td>
                      <td>160</td>
                    </tr>
                    <tr>
                      <th>5</th>
                      <td>Piyaya</td>
                      <td>2</td>
                      <td>80</td>
                      <td>160</td>
                    </tr>
                    <tr>
                      <th>6</th>
                      <td>Piyaya</td>
                      <td>2</td>
                      <td>80</td>
                      <td>160</td>
                    </tr>
                    <tr>
                      <th>7</th>
                      <td>Piyaya</td>
                      <td>2</td>
                      <td>80</td>
                      <td>160</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <th></th>
                      <td></td>
                      <td>
                        <b>Total:</b>
                      </td>
                      <td>PHP</td>
                      <td>990</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
