/**
 * Типів транзакцій всього два.
 * Можна покласти чи зняти гроші з рахунку.
 */
const Transaction = {
    DEPOSIT: 'deposit',
    WITHDRAW: 'withdraw',
  };
  
  /**
   * Кожна транзакція це об'єкт із властивостями: id, type та amount
   */
  const account = {
    // Поточний баланс рахунку
    balance: 0,
  
    // Історія транзакцій
    transactions: [
        // {id:0, ammout, type }
    ],
  
    /**
     * Метод створює та повертає об'єкт транзакції.
     * Приймає суму та тип транзакції.
     */
    createTransaction(amount, type) {
        let id; 
        let arrayTransactionslength = this.transactions.length
        id = arrayTransactionslength === 0? 0 : arrayTransactionslength;
        const transaction ={id, amount, type };
        this.transactions.push(transaction)
        return transaction
    },
  
    /**
     * Метод, що відповідає за додавання суми до балансу.
     * Приймає суму транзакції.
     * Викликає createTransaction для створення об'єкта транзакції
     * після чого додає його до історії транзакцій
     */
    deposit(amount) {
        this.balance += amount;
        this.createTransaction(amount, Transaction.DEPOSIT)
        return `You put on deposit ${amount}. The operation is succesful. Your total balance is ${this.balance }`
    },
  
    /**
     * Метод, що відповідає за зняття суми з балансу.
     * Приймає суму транзакції.
     * Викликає createTransaction для створення об'єкта транзакції
     * після чого додає його до історії транзакцій.
     *
     * Якщо amount більше ніж поточний баланс, виводь повідомлення
     * про те, що зняття такої суми не можливе, недостатньо коштів.
     */
    withdraw(amount) {
        if(amount > this.balance) {
            return `You don't have enoungh money to continue operation. Check your balance and try fewer summ`
        }
        this.balance -= amount;
        this.createTransaction(amount, Transaction.WITHDRAW)
        return `You take off from deposit ${amount}. The operation is succesful. Your total balanc is ${this.balance }`
    },
  
    /**
     * Метод повертає поточний баланс
     */
    getBalance() {
        return this.balance;
    },
  
    /**
     * Метод шукає та повертає об'єкт транзакції по id
     */
    getTransactionDetails(id) {
        let arrayTransactionslength = this.transactions.length
        if(id>arrayTransactionslength || arrayTransactionslength === 0) {
            return  `there is no operation with id #${id}`
        }
        for(const transaction of this.transactions) {
            if(transaction.id === id) {
                return transaction 
            }
        }
         return `there is no operation with id #${id}`

    },
  
    /**
     * Метод повертає кількість коштів
     * певного типу транзакції з усієї історії транзакцій
     */
    getTransactionTotal(type) {
        let typeBalance =this.transactions.filter(value => value.type === type).reduce((acc, item)=>acc+item.amount,0)
        return typeBalance;
    },
  
    /* ============== Додаткові методи ============== */
    /**
     * Метод видаляє всі транзакції та скидає баланс рахунку до 0.
     */
    resetAccount() {
        this.balance=0;
        this.transactions.length = 0;
        console.log();
        return `Operation is Succesful. Balance is ${this.balance}, transaction history is ${this.transactions}`
    },
  
    /**
     * Метод повертає кількість всіх транзакцій.
     */
    getTransactionCount() {
        let arrayTransactionslength = this.transactions.length;
        return `There are  ${arrayTransactionslength} operations`
    },
    /**
     * Метод повертає середнє значення по типу транзакції за всю історію.
     * Якщо транзакцій немає повертає 0.
     */
    getAverageTransactionValue(type) {
        let averageTransaction;
        averageTransaction = this.transactions.filter(value => value.type === type).reduce((acc, item, index, array)=> {
            acc+=item.amount;
            if (index === array.length-1) {
                return  acc/array.length
            }
          return acc
        },0)
        return averageTransaction;
  },
}


let b =account.deposit(60000) 
console.log(b);

b =account.deposit(40000) 
console.log(b);

console.log(account.transactions);

let f =account.getTransactionDetails(2)
console.log(f);

let c =  account.withdraw(5000)
console.log(c);
console.log(account.transactions);

c =  account.withdraw(3000)
console.log(c);
console.log(account.transactions);

let d = account.getBalance();
console.log(d);


f =account.getTransactionDetails(0)
console.log(f);

// f =account.getTransactionDetails(1)
// console.log(f);

// f =account.getTransactionDetails(3)
// console.log(f);

// f =account.getTransactionDetails(2)
// console.log(f);
// let e =account.getTransactionTotal('deposit');
// console.log(e);
// e =account.getTransactionTotal('withdraw');
// console.log(e);


// let s = account.getAverageTransactionValue('withdraw');
// console.log(s);