BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Bill] (
    [ID] INT NOT NULL,
    [OrderDate] INT NOT NULL,
    [Status] INT NOT NULL,
    [Address] VARCHAR(50) NOT NULL,
    [DiscID] INT,
    [StaffID] INT NOT NULL,
    [CustID] INT NOT NULL,
    CONSTRAINT [PK_Bill_ID] PRIMARY KEY CLUSTERED ([ID])
);

-- CreateTable
CREATE TABLE [dbo].[BillDetail] (
    [SEQ] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF__BillDetail__SEQ__45F365D3] DEFAULT newid(),
    [BillID] INT NOT NULL,
    [ProductID] INT NOT NULL,
    CONSTRAINT [PK_BillDetail_SEQ] PRIMARY KEY CLUSTERED ([SEQ])
);

-- CreateTable
CREATE TABLE [dbo].[Customer] (
    [ID] INT NOT NULL,
    [Phone] CHAR(10) NOT NULL,
    [Point] INT NOT NULL,
    [FirstName] VARCHAR(30) NOT NULL,
    [LastName] VARCHAR(30) NOT NULL,
    CONSTRAINT [PK_Customer_ID] PRIMARY KEY CLUSTERED ([ID])
);

-- CreateTable
CREATE TABLE [dbo].[Diamond] (
    [Origin] VARCHAR(1) NOT NULL,
    [ID] INT NOT NULL,
    [Shape] VARCHAR(4) NOT NULL,
    [Carat] INT NOT NULL,
    [Color] VARCHAR(10) NOT NULL,
    [Clarity] VARCHAR(5) NOT NULL,
    [Cut] VARCHAR(10) NOT NULL,
    [ProductID] INT NOT NULL,
    CONSTRAINT [PK_Diamond_ID] PRIMARY KEY CLUSTERED ([ID])
);

-- CreateTable
CREATE TABLE [dbo].[DiamondProduct] (
    [ID] INT NOT NULL,
    [Price] INT NOT NULL,
    CONSTRAINT [PK_DiamondProduct_ID] PRIMARY KEY CLUSTERED ([ID])
);

-- CreateTable
CREATE TABLE [dbo].[Discount] (
    [ID] INT NOT NULL,
    [Value] INT NOT NULL,
    [Status] CHAR(2) NOT NULL,
    [ExpiredDate] DATE NOT NULL,
    CONSTRAINT [PK_Discount_ID] PRIMARY KEY CLUSTERED ([ID])
);

-- CreateTable
CREATE TABLE [dbo].[Staff] (
    [ID] INT NOT NULL,
    [Name] VARCHAR(60) NOT NULL,
    CONSTRAINT [PK_Staff_ID] PRIMARY KEY CLUSTERED ([ID])
);

-- AddForeignKey
ALTER TABLE [dbo].[Bill] ADD CONSTRAINT [FK_Bill_CustID_Customer_ID] FOREIGN KEY ([CustID]) REFERENCES [dbo].[Customer]([ID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Bill] ADD CONSTRAINT [FK_Bill_DiscID_Discount_ID] FOREIGN KEY ([DiscID]) REFERENCES [dbo].[Discount]([ID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Bill] ADD CONSTRAINT [FK_Bill_StaffID_Staff_ID] FOREIGN KEY ([StaffID]) REFERENCES [dbo].[Staff]([ID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[BillDetail] ADD CONSTRAINT [FK_BillDetail_BillID_Bill_ID] FOREIGN KEY ([BillID]) REFERENCES [dbo].[Bill]([ID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[BillDetail] ADD CONSTRAINT [FK_BillDetail_ProductID_DiamondProduct_ID] FOREIGN KEY ([ProductID]) REFERENCES [dbo].[DiamondProduct]([ID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Diamond] ADD CONSTRAINT [FK_Diamond_ProductID_DiamondProduct_ID] FOREIGN KEY ([ProductID]) REFERENCES [dbo].[DiamondProduct]([ID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

