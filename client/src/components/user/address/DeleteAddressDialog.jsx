import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Loader2, Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  deleteAddress,
  getAddresses,
} from "@/redux/user/address/addressThunk";

const DeleteAddressDialog = ({
  open,
  onOpenChange,
  address,
}) => {
  const dispatch = useDispatch();

  const { loading } = useSelector(
    (state) => state.address
  );

  const handleDelete = async () => {
    if (!address) return;

    try {
      await dispatch(
        deleteAddress(address._id)
      ).unwrap();

      dispatch(getAddresses());

      toast.success(
        "Address deleted successfully."
      );

      onOpenChange(false);
    } catch (error) {
      toast.error(
        error || "Unable to delete address."
      );
    }
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent className="rounded-3xl">

        <AlertDialogHeader>

          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <Trash2 className="h-8 w-8 text-red-600" />
          </div>

          <AlertDialogTitle className="text-center text-2xl">
            Delete Address?
          </AlertDialogTitle>

          <AlertDialogDescription className="text-center leading-7">

            This action cannot be undone.

            <br />

            Are you sure you want to delete this
            delivery address?

          </AlertDialogDescription>

        </AlertDialogHeader>

        {address && (
          <div className="rounded-2xl bg-slate-50 p-5">

            <h4 className="font-semibold">
              {address.fullName}
            </h4>

            <p className="mt-2 text-sm text-slate-600">
              {address.addressLine1}
            </p>

            {address.addressLine2 && (
              <p className="text-sm text-slate-600">
                {address.addressLine2}
              </p>
            )}

            <p className="text-sm text-slate-600">
              {address.city},{" "}
              {address.state}
            </p>

            <p className="text-sm text-slate-600">
              {address.pincode}
            </p>

          </div>
        )}

        <AlertDialogFooter className="mt-4">

          <AlertDialogCancel
            disabled={loading}
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            className="bg-red-600 hover:bg-red-700"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Address
              </>
            )}
          </AlertDialogAction>

        </AlertDialogFooter>

      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAddressDialog;